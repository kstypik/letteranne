#!/bin/bash
# persistent bash history
HISTFILE=~/.bash_history
PROMPT_COMMAND="history -a; $PROMPT_COMMAND"

# set some django env vars
# shellcheck disable=SC1091
. /entrypoint.sh

# restore default shell options
set +o errexit
set +o pipefail
set +o nounset

# start ssh-agent
# https://code.visualstudio.com/docs/remote/troubleshooting
eval "$(ssh-agent -s)"
