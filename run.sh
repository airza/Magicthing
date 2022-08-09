docker build --platform linux/amd64 -t magic .
docker run --rm -it --name magic --mount type=bind,source="$(pwd)"/app,target=/www -p 7777:80 -p 9229:9229 magic