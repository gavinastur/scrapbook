# scans the docker registry and prunes the registry so that there are no more than 15 tagged images for each image
import json
import re
import subprocess

IMAGE_THRESHOLD = 15

image_list_string = subprocess.check_output(
    ["gcloud", "container", "images", "list", "--repository", "eu.gcr.io/fuori-prod",
     "--format=json"]).decode('utf-8')
images = json.loads(image_list_string)
image_list = [image["name"] for image in images]
clean_image_list = [image.rsplit("/", 1)[1] for image in image_list]
# image_list is now a list of all images stored in our registry
print(str(image_list))

for image_name in image_list:
    clean_image_name = image_name.rsplit("/", 1)[1]
    print("image: " + str(clean_image_name))

    all_tags = {}
    image_description = json.loads(
        subprocess.check_output(["gcloud", "container", "images", "list-tags", image_name, "--format=json"]).decode(
            'utf-8'))

    masterCount = 0
    branchCount = 0
    for idx, image_instance in enumerate(image_description):
        tag_list = image_instance["tags"]
        todelete = image_name + "@" + image_instance["digest"]

        if not tag_list:
            masterCount += 1
            if masterCount > IMAGE_THRESHOLD:
                print("delete notag : " + image_name)
                # gcloud container images delete [HOSTNAME]/[PROJECT-ID]/[IMAGE]@[IMAGE_DIGEST]
                subprocess.check_output(["gcloud", "container", "images", "delete", todelete, "--quiet"])

        else:
            tag = tag_list[0]
            print("  tag: " + str(tag))

            if "-" in tag:
                branchCount += 1
                if branchCount > IMAGE_THRESHOLD:
                    print("delete tag: " + image_name + ":" + tag)
                    # gcloud container images delete [HOSTNAME]/[PROJECT-ID]/[IMAGE]@[IMAGE_DIGEST]
                    subprocess.check_output(
                        ["gcloud", "container", "images", "delete", todelete, "--force-delete-tags", "--quiet"])

            else:
                masterCount += 1
                if masterCount > IMAGE_THRESHOLD:
                    # Exclude latest / staging
                    matched = re.match(r'^staging|latest$', tag)
                    if not matched:
                        print("delete tag: " + image_name + ":" + tag)
                        # gcloud container images delete [HOSTNAME]/[PROJECT-ID]/[IMAGE]@[IMAGE_DIGEST]
                        subprocess.check_output(
                            ["gcloud", "container", "images", "delete", todelete, "--force-delete-tags", "--quiet"])

                    else:
                        print("ignored: " + tag)
