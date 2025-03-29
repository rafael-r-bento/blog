# Arch Linux Installation

This particular installation assumes boot in UEFI mode and SystemD init system.
For detailed instructions, see [Installation Guide](https://wiki.archlinux.org/title/Installation_guide).

## Download

First, download the Arch Linux ISO and verify its signature and checksum.

```
$ wget https://archlinux.c3sl.ufpr.br/iso/2024.07.01/archlinux-2024.07.01-x86_64.iso
$ wget https://archlinux.org/iso/2024.07.01/archlinux-2024.07.01-x86_64.iso.sig
$ gpg --auto-key-locate clear,wkd -v --locate-external-key pierre@archlinux.org    
$ gpg --keyserver-options auto-key-retrieve --verify archlinux-2024.07.01-x86_64.iso.sig
$ wget https://archlinux.org/iso/2024.07.01/sha256sums.txt
$ sha256sum -c sha256sums.txt
```

## Pre-installation

Write the Arch Linux ISO media to the USB flash drive (in this case, the device
file for the USB drive is */dev/sdb*; verify the correct device file name
before proceding to run the command below):

```
# dd bs=4M if=archlinux-2024.07.01-x86_64.iso of=/dev/sdb conv=fsync oflag=direct status=progress
```

Boot by pressing F11 or similar. Select "Arch Linux install medium (x86\_64,
UEFI)" from the live medium menu.

![Step on boot installation showing five options](/assets/install_archlinux1.png)

Configure keyboard layout (for a list of keymaps, type `localectl list-keymaps`):

```
# loadkeys br-abnt2
```

If you have wired internet access, just test the internet connection:

```
# ping archlinux.org
```

If you have only wireless internet available, follow the instructions in
[iwctl](https://wiki.archlinux.org/title/Iwctl).

Update the system clock:

```
# timedatectl
```

Partition the HD/SSD by using **cfdisk** command.

```
# cfdisk
```

![Screen showing the configuration for HD/SSD](/assets/install_archlinux2.png)

List the partitions for verification with the **fdisk** command.

```
# fdisk -l
```

Format the partitions:

```
# mkfs.fat -F 32 /dev/sda1
# mkswap /dev/sda2
# mkfs.ext4 /dev/sda3
```

Mount the partitions:

```
# mount /dev/sda3 /mnt
# mount --mkdir /dev/sda1 /mnt/boot
# swapon /dev/sda2
```

## Installation

Install the base package, Linux kernel, and other packages of your choice:

```
# pacstrap -K /mnt base linux nano grub efibootmgr networkmanager iwd
```

## Configure the System

Generate an **fstab**:

```
# genfstab -U /mnt >> /mnt/etc/fstab
```

**chroot** into the new system:

```
# arch-chroot /mnt
```

Symlink */etc/localtime* to */usr/share/zoneinfo/Zone/SubZone*:

```
# ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
```

Run **hwclock** to generate */etc/adjtime*:

```
# hwclock --systohc
```

Open the */etc/locale.gen* file and uncomment the locale *en_US.UTF-8 UTF-8*.

Generate the locale with the **locale-gen** command:

```
# locale-gen
```

Create the file */etc/NetworkManager/conf.d/wifi_backend.conf* like this:

#### **`/etc/NetworkManager/conf.d/wifi_backend.conf`**
```
[device]
wifi.backend=iwd
```

Create the file */etc/locale.conf* like this:

#### **`/etc/locale.conf`**
```
LANG=en_US.UTF-8
```

Create the file */etc/vconsole.conf* and add console keymap preferences in it:

#### **`/etc/vconsole.conf`**
```
KEYMAP=br-abnt2
```

Create the file */etc/hostname* like this:

#### **`/etc/hostname`**
```
bentopc
```

Re-generate the initial RAM-disk:

```
# mkinitcpio -P
```

Set a root password:

```
# passwd
```

Create a normal user login and set a password:

```
# useradd -m bento
# passwd bento
```

Install GRUB in the boot disk and generate an appropriate boot menu file:

```
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=grub --recheck
# grub-mkconfig -o /boot/grub/grub.cfg
```

## Reboot

Exit **chroot**, un-mount the partitions and reboot the system:

```
# exit
# swapoff /dev/sda2
# umount /mnt/boot
# umount /mnt
# reboot
```

## GNOME

Start and enable NetworkManager service:

```
# systemctl start NetworkManager
# systemctl enable NetworkManager
```

Install GNOME desktop environment:

```
# pacman -S gnome
```

Start **gdm** login screen:

```
# systemctl start gdm
```

Set the **gdm** service to run on system boot:

```
# systemctl enable gdm
# reboot
```

## Conclusion

Arch Linux installed successfully.

![Main Arch Linux screen with GNOME after installation](/assets/install_archlinux3.png)
