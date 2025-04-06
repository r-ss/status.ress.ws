#!/bin/sh
bun run build
rsync -chvr --delete-after ~/dev/status.ress.ws/dist/ ress@fold:status.ress.ws/