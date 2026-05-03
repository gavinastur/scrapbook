#outputs fixed tag names for all "latest" tagged images
import json
import subprocess
import argparse


def clean_image_name(image_name):
    """ removes repository name from a full image name """
    return image_name.rsplit("/", 1)[1]

parser = argparse.ArgumentParser()
parser.add_argument("-s", "--searchtag", help="tag you wish to search for, by default 'latest'", default="latest")
args = parser.parse_args()
search_tag = args.searchtag
#list of tags which are not specific enough to be used in deployments
generic_tags = ["staging","prod","latest"]

image_list_string = subprocess.check_output(["gcloud","container","images","list","--repository","eu.gcr.io/fuori-prod","--format=json"]).decode('utf-8')
images = json.loads(image_list_string)
image_list = [image["name"] for image in images]
#image_list is now a list of all images stored in our registry

result = {}
for image_name in image_list:
    image_description = json.loads(subprocess.check_output(
        ["gcloud", "container", "images", "list-tags", image_name, "--format=json"]).decode('utf-8'))
    #find all tags for images that are tagged with latest
    tags = [image["tags"] for image in image_description if search_tag in image["tags"]]
    if(len(tags) == 0):
        #if no image has this tag, skip this image
        continue
    else:
        tags = tags[0]
    #remove all generic tags
    tags = [tag for tag in tags if tag not in generic_tags]
    if(len(tags) != 0):
        result[clean_image_name(image_name)] = tags[0]

print(result)
