#!/bin/sh
npm run build
rsync -chvr --delete-after ~/dev/status.ress.ws/dist/ ress@foldwrap.com:status.ress.ws/