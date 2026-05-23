---
sidebar_position: 3
---

# File and Directory Permissions

In GNU/Linux, every file and directory belongs to a user and a group.

The **owner** is usually the user who created the file, while the **group** is commonly the primary group of that user. For example, if a user named `parrot` creates a file, that file usually belongs to the `parrot` user and to the `parrot` group.

Because system files are usually owned by `root`, regular users often need to use the `sudo` command to read, modify, execute, or change permissions on protected files and directories.

## Understanding `ls -l`

To inspect file and directory permissions, use:

```bash
ls -l
```

Example:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l
-rw-rw-r-- 1 parrot hackers    0 Oct 16 12:32 archive.txt
drwxr-xr-x 3 parrot hackers 4096 Oct 15 16:25 scripts
```

The output contains several fields:

```text
-rw-rw-r-- 1 parrot hackers    0 Oct 16 12:32 archive.txt
drwxr-xr-x 3 parrot hackers 4096 Oct 15 16:25 scripts
```

| Field | Description |
|---|---|
| `-` or `d` | Indicates whether the item is a file (`-`) or a directory (`d`) |
| `rw-rw-r--` | Permission string |
| `1` / `3` | Number of hard links |
| `parrot` | Owner user |
| `hackers` | Owner group |
| `0` / `4096` | File or directory size |
| `Oct 16 12:32` | Last modification date and time |
| `archive.txt` / `scripts` | File or directory name |

The first character identifies the file type:

| Character | Meaning |
|---|---|
| `-` | Regular file |
| `d` | Directory |
| `l` | Symbolic link |

The next nine characters represent permissions:

```text
rw-rw-r--
```

They are divided into three groups:

```text
Owner   Group   Others
rw-     rw-     r--
```

## Permission Types

Linux permissions are based on three basic permission types:

| Permission | Symbol | Meaning for files | Meaning for directories |
|---|---|---|---|
| Read | `r` | Allows reading the file content | Allows listing directory contents |
| Write | `w` | Allows modifying the file | Allows creating, deleting, or renaming files inside the directory |
| Execute | `x` | Allows executing the file as a program or script | Allows entering/accessing the directory |

Example:

```text
-rw-rw-r--
```

This means:

| Class | Permissions | Meaning |
|---|---|---|
| Owner | `rw-` | Can read and write |
| Group | `rw-` | Can read and write |
| Others | `r--` | Can only read |

So, all users can read the file, but only the owner and members of the owner group can modify it.

## Numeric Permissions

Permissions can also be represented using numeric values.

| Permission | Value |
|---|---|
| Read `r` | 4 |
| Write `w` | 2 |
| Execute `x` | 1 |

The final value is calculated by adding these numbers.

| Permission | Calculation | Value |
|---|---:|---:|
| `rwx` | 4 + 2 + 1 | 7 |
| `rw-` | 4 + 2 + 0 | 6 |
| `r-x` | 4 + 0 + 1 | 5 |
| `r--` | 4 + 0 + 0 | 4 |
| `-wx` | 0 + 2 + 1 | 3 |
| `-w-` | 0 + 2 + 0 | 2 |
| `--x` | 0 + 0 + 1 | 1 |
| `---` | 0 + 0 + 0 | 0 |

Examples:

| Permissions | Numeric Value |
|---|---:|
| `rwxrwxrwx` | 777 |
| `rwxr-xr--` | 754 |
| `r-xr-----` | 540 |
| `rw-r--r--` | 644 |
| `rwxr-xr-x` | 755 |
| `rwxrwx---` | 770 |

## `chmod`

The `chmod` command is used to change file and directory permissions.

Basic syntax:

```bash
chmod [permissions] [file_or_directory]
```

Example directory:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rw-r--r-- 1 parrot hackers  932 Oct 18 01:06 ddos-detect.py
-rwxr-xr-x 1 parrot hackers  235 Oct 18 01:06 ping.sh
-rwxr-xr-x 1 parrot hackers  780 Oct 18 01:17 wireless-dos-ids.py
-rw-r--r-- 1 parrot hackers 1587 Oct 18 01:05 wireless-dos.py
```

In this example, some scripts have execute permission for everyone, while others do not have execute permission even for the owner.

To set read, write, and execute permissions for the owner and group, while removing all permissions from others, use:

```bash
chmod -R 770 scripts/
```

Then check the result:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rwxrwx--- 1 parrot hackers  932 Oct 18 01:06 ddos-detect.py
-rwxrwx--- 1 parrot hackers  235 Oct 18 01:06 ping.sh
-rwxrwx--- 1 parrot hackers  780 Oct 18 01:17 wireless-dos-ids.py
-rwxrwx--- 1 parrot hackers 1587 Oct 18 01:05 wireless-dos.py
```

Now:

| Class | Permissions | Meaning |
|---|---|---|
| Owner | `rwx` | Can read, write, and execute |
| Group | `rwx` | Can read, write, and execute |
| Others | `---` | No access |

The `-R` option applies the change recursively to the directory and its contents.

> Be careful when using `chmod -R`, especially on system directories.

## Symbolic Mode with `chmod`

Besides numeric permissions, `chmod` also supports symbolic mode.

The basic syntax is:

```bash
chmod [class][operator][permission] [file_or_directory]
```

Classes:

| Symbol | Meaning |
|---|---|
| `u` | User/owner |
| `g` | Group |
| `o` | Others |
| `a` | All users |

Operators:

| Symbol | Meaning |
|---|---|
| `+` | Add permission |
| `-` | Remove permission |
| `=` | Set exact permission |

Permissions:

| Symbol | Meaning |
|---|---|
| `r` | Read |
| `w` | Write |
| `x` | Execute |

Examples:

| Command | Meaning |
|---|---|
| `chmod a+r file.txt` | Adds read permission for everyone |
| `chmod +r file.txt` | Same as `a+r`; if no class is specified, `a` is assumed |
| `chmod og-x script.sh` | Removes execute permission from group and others |
| `chmod u+rwx script.sh` | Gives read, write, and execute permissions to the owner |
| `chmod o-rwx file.txt` | Removes all permissions from others |
| `chmod g+w file.txt` | Adds write permission for the group |
| `chmod u=rw file.txt` | Sets owner permissions to read and write only |

Example:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ chmod -R og-x scripts/
```

Check the result:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rwxrw---- 1 parrot hackers  932 Oct 18 01:06 ddos-detect.py
-rwxrw---- 1 parrot hackers  235 Oct 18 01:06 ping.sh
-rwxrw---- 1 parrot hackers  780 Oct 18 01:17 wireless-dos-ids.py
-rwxrw---- 1 parrot hackers 1587 Oct 18 01:05 wireless-dos.py
```

The execute permission was removed from the group and others, while the owner kept read, write, and execute permissions.

## `chown`

The `chown` command is used to change the owner and, optionally, the group of a file or directory.

Basic syntax:

```bash
chown [options] [owner][:group] [file_or_directory]
```

Examples:

```bash
chown root file.txt
```

Changes only the owner to `root`.

```bash
chown root:root file.txt
```

Changes both the owner and group to `root`.

```bash
chown :hackers file.txt
```

Changes only the group to `hackers`.

Useful options:

| Option | Description |
|---|---|
| `-R` | Recursively changes ownership of directories and their contents |
| `-v` or `--verbose` | Shows detailed output |
| `--version` | Shows the program version |
| `--dereference` | Affects the target of symbolic links instead of the link itself |
| `-h` or `--no-dereference` | Affects symbolic links instead of their targets |
| `--reference=FILE` | Uses another file as a reference for ownership |

Example:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rwxrw---- 1 parrot parrot  932 Oct 18 01:06 ddos-detect.py
-rwxrw---- 1 parrot parrot  235 Oct 18 01:06 ping.sh
-rwxrw---- 1 parrot parrot  780 Oct 18 01:17 wireless-dos-ids.py
-rwxrw---- 1 parrot parrot 1587 Oct 18 01:05 wireless-dos.py
```

Change owner and group recursively:

```bash
sudo chown -R root:root scripts/
```

Check the result:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rwxrw---- 1 root root  932 Oct 18 01:06 ddos-detect.py
-rwxrw---- 1 root root  235 Oct 18 01:06 ping.sh
-rwxrw---- 1 root root  780 Oct 18 01:17 wireless-dos-ids.py
-rwxrw---- 1 root root 1587 Oct 18 01:05 wireless-dos.py
```

In this example, both the owner and group of all files inside the `scripts` directory were changed to `root`.

To change only the owner:

```bash
sudo chown -R parrot scripts/
```

Check the result:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rwxrw---- 1 parrot root  932 Oct 18 01:06 ddos-detect.py
-rwxrw---- 1 parrot root  235 Oct 18 01:06 ping.sh
-rwxrw---- 1 parrot root  780 Oct 18 01:17 wireless-dos-ids.py
-rwxrw---- 1 parrot root 1587 Oct 18 01:05 wireless-dos.py
```

Now the owner is `parrot`, but the group remains `root`.

## `chgrp`

The `chgrp` command is used to change only the group ownership of a file or directory.

Basic syntax:

```bash
chgrp [options] [group] [file_or_directory]
```

Useful options:

| Option | Description |
|---|---|
| `-R` | Recursively changes the group of directories and their contents |
| `-v` or `--verbose` | Shows detailed output |
| `--version` | Shows the program version |
| `--dereference` | Affects the target of symbolic links instead of the link itself |
| `-h` or `--no-dereference` | Affects symbolic links instead of their targets |
| `--reference=FILE` | Uses another file as a reference for group ownership |

Example:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rwxrw---- 1 parrot root  932 Oct 18 01:06 ddos-detect.py
-rwxrw---- 1 parrot root  235 Oct 18 01:06 ping.sh
-rwxrw---- 1 parrot root  780 Oct 18 01:17 wireless-dos-ids.py
-rwxrw---- 1 parrot root 1587 Oct 18 01:05 wireless-dos.py
```

Change the group recursively to `hackers`:

```bash
sudo chgrp -R hackers scripts/
```

Check the result:

```bash
┌─[user@parrot]─[/home/parrot]
└──╼ $ ls -l scripts/
total 16
-rwxrw---- 1 parrot hackers  932 Oct 18 01:06 ddos-detect.py
-rwxrw---- 1 parrot hackers  235 Oct 18 01:06 ping.sh
-rwxrw---- 1 parrot hackers  780 Oct 18 01:17 wireless-dos-ids.py
-rwxrw---- 1 parrot hackers 1587 Oct 18 01:05 wireless-dos.py
```

In this example, only the group changed from `root` to `hackers`. The owner remained `parrot`.

## Practical Recommendations

When managing permissions, follow the principle of least privilege: give only the permissions that are necessary.

Common permission values:

| Permission | Common Use |
|---|---|
| `644` | Regular files readable by everyone, writable only by the owner |
| `600` | Private files readable and writable only by the owner |
| `755` | Executable files or directories accessible by everyone |
| `700` | Private directories accessible only by the owner |
| `770` | Directories shared between owner and group, with no access for others |

Examples:

```bash
chmod 644 notes.txt
```

Sets a regular file as readable by everyone and writable only by the owner.

```bash
chmod 755 script.sh
```

Allows everyone to read and execute the script, but only the owner can modify it.

```bash
chmod 700 private/
```

Allows only the owner to access the directory.

```bash
chmod 770 team-scripts/
```

Allows the owner and group to fully access the directory, while blocking others.

## Summary

Linux permissions define who can read, write, and execute files and directories.

The most important commands are:

| Command | Purpose |
|---|---|
| `ls -l` | Displays file and directory permissions |
| `chmod` | Changes permissions |
| `chown` | Changes owner and optionally group |
| `chgrp` | Changes only the group |

Understanding these commands is essential for managing a GNU/Linux system securely and correctly.