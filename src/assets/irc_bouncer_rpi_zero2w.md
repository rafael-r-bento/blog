# Setup an IRC bouncer on Raspberry Pi Zero 2 W

## Introduction

IRC bouncer is a middleman between your IRC client and an IRC network. It
connects to a network like a normal client and your client connect to the
IRC bouncer instead of connecting direcly to the IRC network. Usually you
would set it up to log and show for you the messages received while you
are "offline" (the IRC bouncer makes you stay always online).

Raspberry Pi Zero 2 W is an embedded device that allows install various
GNU/Linux operating systems that supports it.

Raspberry Pi Zero 2 W simplified diagram:

![Raspberry Pi Zero 2 W diagram](/assets/rpi_zero2w_diagram.png)

| Specification | Description                                                               |
| ------------- |:--------------------------------------------------------------------------|
| Processor     | Broadcom BCM2710A1, quad-core 64-bit SoC (Arm Cortex-A53 @ 1GHz)          |
| Memory        | 512MB LPDDR2                                                              |
| Connectivity  | 2.4GHz IEEE 802.11b/g/n wireless LAN, Bluetooth 4.2, BLE, onboard antenna |
|               | 1 x USB 2.0 interface with OTG                                            |
|               | HAT-compatible 40-pin I/O header footprint                                |
|               | microSD card slot                                                         |
|               | Mini HDMI port                                                            |
|               | CSI-2 camera connector                                                    |
| Video         | HDMI interface                                                            |
|               | Composite video                                                           |
| Multimedia    | H.264, MPEG-4 decode (1080p30)                                            |
|               | H.264 encode (1080p30)                                                    |
|               | OpenGL ES 1.1, 2.0 graphics                                               |
| Input power   | 5V DC 2.5A                                                                |

## Hardware setup

What you will need:

- Raspberry Pi Zero 2 W
- Micro SD card
- Raspberry Pi Micro USB Power Supply
- USB to Micro USB adapter
- HDMI to Mini HDMI adapter

## Arch Linux ARM installation

Connect the micro SD card in a USB port.

Download script `install_archlinux_rpi.sh` and run with sudo rights:

```
$ wget https://raw.githubusercontent.com/rafael-r-bento/install-archlinuxarm/refs/heads/master/install_archlinux_rpi.sh
$ chmod a+x install_archlinux_rpi.sh
$ sudo ./install_archlinux_rpi.sh sdb
```

Observation: check the device name for the micro SD before include as argument
for the script.

Wait for the script execution to finish.

Download packages **iwd** and **ell** from Arch Linux ARM website and put them
in `/home/alarm` folder, located in Ext4 partition from micro SD card.

Remove the micro SD card from the main computer and insert it in the Pi
Zero. With the card inserted, apply power via a USB cable to the PWR IN
connector. You should see some activity on the green LED light. This means the
Pi Zero found a good OS image and is booting.

## Arch Linux ARM initial setup

For this initial setup, connect keyboard and monitor.

Default user and password: alarm. Default root password: root.

Configure keyboard layout (for a list of keymaps, type `localectl list-keymaps`):

```
# loadkeys br-abnt2
```

Install the packages **ell** and **iwd**:

```
# pacman -U ell-0.71-1-armv7h.pkg.tar.xz
# pacman -U iwd-3.3-1-armv7h.pkg.tar.xz
```

Reboot the system:

```
# reboot
```

Enable and start **iwd** service:

```
# systemctl enable iwd.service
# systemctl start iwd.service
```

List all Wi-Fi devices:

```
# iwctl device list
```

Connect to a network:

> \# iwctl station *NAME* connect *SSID*

```
# iwctl station wlan0 connect BENTO
```

Create and edit file `/etc/iwd/main.conf` to allows **iwd** to assign IP
addresses and setup routes using a built-in DHCP client or with static
configuration.

#### **`/etc/iwd/main.conf`**
```
[General]
EnableNetworkConfiguration=true
```

Test internet connection:

```
# ping archlinux.org
```

Update the system clock:

```
# timedatectl
```

Initialize the pacman keyring and populate the Arch Linux ARM package signing
keys:

```
# pacman-key --init
# pacman-key --populate archlinuxarm
```

Update the system and reboot again:

```
# pacman -Syu
# reboot
```

You can disconnect the keyboard and monitor.

## SSH connection

Command to ssh into the Pi Zero:

> $ ssh *USERNAME*@*RPI-PI-ADDRESS*

```
$ ssh alarm@192.168.0.22
```

Observation: run `nmap -sn 192.168.0.0/24` to discover the ip addresses of
connected devices in the network.

## ZNC installation

Install the **znc** package:

```
# pacman -S znc
```

Configure **znc** (datailed instructions can be found in [https://wiki.znc.in/Configuration](https://wiki.znc.in/Configuration)
and [https://wiki.archlinux.org/title/ZNC](https://wiki.archlinux.org/title/ZNC)):

```
# su -s /bin/bash znc
[znc]$ znc --makeconf --datadir /var/lib/znc
```

    -- Global settings --

    Listen on port (1025 to 65534): 1025
    Listen using SSL (yes/no) [no]: yes
    Listen using both IPv4 and IPv6 (yes/no) [yes]: yes

    -- Admin user settings --

    Username (alphanumeric): rafael_bento
    Enter password: ******** 
    Confirm password: ********
    Nick [rafael_bento]: 
    Alternate nick [rafael_bento_]: 
    Ident [rafael_bento]: 
    Real name (optional): Rafael Bento
    Bind host (optional): 

    Set up a network? (yes/no) [yes]: yes

    -- Network settings --
 
    Name [libera]: libera
    Server host [irc.libera.chat]: irc.libera.chat
    Server uses SSL? (yes/no) [yes]: yes
    Server port (1 to 65535) [6697]: 6697
    Server password (probably empty): ********
    Initial channels:

Enable and start ZNC service:

```
# systemctl enable znc.service
# systemctl start znc.service
```

## ZNC Usage

Access `https://<rpi-ip-address>:1025` in browser to log in ZNC server
to view and update configurations. Change **Buffer size** value (from Channels
and Queries) in **Your Settings** to `100000`. Other change that I made was to
set the timezone to `GMT-3`. Save the settings pressing the **Save and return**
button.

Also configure which message types you will be notified by settting
`C-h v erc-track-exclude-types`.

![erc-track-exclude-types variable configuration](/assets/erc_track_exclude_types.png)
  
Command to start ERC client inside GNU Emacs: `M-x erc-tls`.

    Server: <rpi-ip-address>
    Port: 1025
    Nickname: rafael_bento
    Server password: rafael_bento/libera:<admin-password>

For a complete list of ZNC commands, see [https://wiki.znc.in/Using_commands](https://wiki.znc.in/Using_commands).
