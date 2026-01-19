# ParrotOS Documentation

This documentation was built with the latest Docusaurus v3 and modified in the style of ParrotOS. It is continuously WIP and will be updated to make this side of the Parrot project better.

We use Docker for development, testing and deployment.

### Build and start the Docker image

```
$ docker build -t parrot-documentation .
$ docker run --rm -ti -p 3000:80 parrot-documentation
```

After those commands, the documentation should be available at `http://localhost:3000/docs/`
