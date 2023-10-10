#!/bin/sh
bun run build
rsync -chvr --delete-after ~/dev/status.ress.ws/dist/ ress@167.172.164.135:status.ress.ws/