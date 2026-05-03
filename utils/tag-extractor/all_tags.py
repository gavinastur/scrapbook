# scans the docker registry and creates a file named <image-name> with a list of all tags for that image
import json
import re
import subprocess
import operator
from collections import OrderedDict

image_list_string = subprocess.check_output(["gcloud", "container", "images", "list", "--repository", "eu.gcr.io/fuori-prod", "--format=json"]).decode('utf-8')
images = json.loads(image_list_string)
image_list = [image["name"] for image in images]
clean_image_list = [image.rsplit("/", 1)[1] for image in image_list]
# image_list is now a list of all images stored in our registry
print(str(image_list))

# Master
for image_name in image_list:
    clean_image_name = image_name.rsplit("/", 1)[1]
    all_tags = {}
    image_description = json.loads(subprocess.check_output(
        ["gcloud", "container", "images", "list-tags", image_name, "--format=json", "--limit=15",
         "--filter= NOT tags:-"]).decode('utf-8'))
    for image_instance in image_description:
        tag_list = image_instance["tags"]

        for tag in tag_list:
            matched = re.match(r'staging|latest', tag)
            if not matched:
                all_tags[tag] = image_instance["timestamp"]["datetime"]
            else:
                print("ignored:" + tag)

    short_name = image_name.rsplit('/', 1)[1]
    all_tags_sorted = OrderedDict(sorted(all_tags.items(), key=operator.itemgetter(1), reverse=True))
    print(str(short_name) + ": " + json.dumps(all_tags_sorted))

    with open(clean_image_name + ".tags", "w") as fp:
        fp.write("\n".join(all_tags_sorted))

# Feature
for image_name in image_list:
    clean_image_name = image_name.rsplit("/", 1)[1]
    all_tags = {}
    image_description = json.loads(subprocess.check_output(
        ["gcloud", "container", "images", "list-tags", image_name, "--format=json", "--filter= tags:-"]).decode(
        'utf-8'))
    for image_instance in image_description:
        tag_list = image_instance["tags"]

        for tag in tag_list:
            matched = re.match(r'staging|latest', tag)
            if not matched:
                all_tags[tag] = image_instance["timestamp"]["datetime"]
            else:
                print("ignored:" + tag)

    short_name = image_name.rsplit('/', 1)[1]
    all_tags_sorted = OrderedDict(sorted(all_tags.items(), key=operator.itemgetter(1), reverse=True))
    print(str(short_name) + ": " + json.dumps(all_tags_sorted))

    with open("feature_" + clean_image_name + ".tags", "w") as fp:
        fp.write("\n".join(all_tags_sorted))
