# Install open-ath9k-htc-firmware for AR9271 chipset WiFi USB

I made a fork of **open-ath9k-htc-firmware** to successfully build
on updated Arch Linux system.

```
$ git clone https://github.com/rafael-r-bento/open-ath9k-htc-firmware.git
$ cd open-ath9k-htc-firmware/
$ make toolchain
$ make -C target_firmware
# cp target_firmware/htc_9271.fw /lib/firmware
# cp target_firmware/htc_7010.fw /lib/firmware
```
