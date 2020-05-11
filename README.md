# Uploader

## 說明

此專案為一個上傳模組範例, 後端的儲存位置為Mount 一個 GoogleDrive, server 環境為 ubuntu 18.04, 因為租用的vps空間有限, 所以想說如果有一個無限大的google drive, 這樣掛上去就有無限大的上傳空間, 最重要的是可以不用自己管理資料備份的問題。

## Google Drive 配置

參考 [這篇文章寫得很清楚](https://personlin.pixnet.net/blog/post/46045941-%E4%BD%BF%E7%94%A8google-drive-ocamlfuse%E6%8E%9B%E8%BC%89google-drive)

### 大致上就是

申請OAuth2 Other 憑證 -> id secret 在 server 上 進行驗證 -> 輸入後會給一個URL，貼到瀏覽器上 -> 會得到一個verify code -> 再貼回遠端的server

```shell
$ google-drive-ocamlfuse -headless -label 'SOME_LABEL' -id 'CLIENT_ID' -secret 'CLIENT_SECRET' 'YOUR_MOUNT_FILDER'
```

## Docker image build


```shell

$ ./docker_build.sh

```



## docker-compose 配置

> 這裡要注意，把google drive 的資料夾掛近 container 裡


```docker-compose
version: '3.1'

services:
  uploader:
    image: uploader
    environment:
      prefix: 'uc'
    volumes: 
      - /googledrive/server_mounts/uploader:/usr/src/app/resource
```

* environment > prefix : 這個是為了nginx，如果使用虛擬目錄，則route需要加一層
* volumes : 這個是掛載 google drive 一個資料夾到uploader resource 裡
