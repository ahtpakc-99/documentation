 
 ##### Basic Usage
 
 :::info Note
 
It's good practice to test every command by attaching the `--dry-run` flag. After ensuring that everything is okay, repeat the command without `--dry-run` option.

:::
 
 1. List all of the remotes configured
 
 ```
 rclone listremotes
 
 ```
 
 2. Copy files from source storage to destination storage
 
 ```
 rclone copy source:path dest:path
 
 ```
 
where `source:path` is the source storage and `dest:path` is the remote storage of destination (e.g a personal folder sent to a remote, or a file sent from a remote to another)


  3. Sync storage

  ```

  rclone sync source:path dest:path

  ```
  
  4. List all of the files in a remote
  
  ```
  
  rclone ls remote:path
  
  ```
  
  5. Delete files and directories from a specific path in the remote
  
  ```
  
  rclone delete remote:path
  
  ```
  