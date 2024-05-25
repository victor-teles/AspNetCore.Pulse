#!/bin/bash
file=operator-installer-linux
if [ ! -f $file ]; then
   echo "Downloading $file"
    wget "https://github.com/victor-teles/AspNetCore.Pulse/raw/main/deploy/operator/installer/releases/$file"
fi
chmod +x $file
./$file
