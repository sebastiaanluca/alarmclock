# Alarm Clock

## Install required packages

```bash
cd /vagrant
sh ./scripts/dev.sh
```

## Build process

1. `yarn run dev` in the vagrant virtual machine
2. Upload (CMD+SHIFT+D) build/alarm.js to the Raspberry Pi
3. `cd /home/pi/alarm-clock && clear && DEBUG=alarm:* node alarm.js` on the Raspberry Pi
