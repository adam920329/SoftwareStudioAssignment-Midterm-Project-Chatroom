# Software Studio 2023 Spring Midterm Project

### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Membership Mechanism                             | 15%       | Y         |
| Firebase page                                    | 5%        | Y         |
| Database read/write                              | 15%       | Y         |
| RWD                                              | 15%       | Y         |
| Chatroom                                         | 20%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Using React                                      | 10%       | Y         |
| Third-Party Sign In                              | 1%        | Y         |
| Notification                                     | 5%        | Y         |
| CSS Animation                                    | 2%        | Y         |
| Security                                         | 2%        | Y         |

| **Other useful functions**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of functions                                  | 1~5%     | N         |


---
## How to use 
### 登入介面 
:::info
![](https://i.imgur.com/qJr8KsS.png)

在登入介面的sign up頁面可以註冊帳號，分別填入user name、email跟password，再按下sign up 就可以註冊，若註冊成功便會跳出chrome notification表示註冊成功，若失敗則會跳出註冊失敗的訊息。

![](https://i.imgur.com/p2fE2d8.png)

註冊完帳號後，點選下方的Login就會有CSS animation並切換到login頁面，填入剛才註冊的帳號密碼並按下Login按鈕就可以進入chat room，在login頁面也有提供google登入的方式，按下Login with Google的帳號後就可以使用google登入

此外在Login頁面的背景也有製作CSS animation。

:::
### 聊天室介面
:::info
![](https://i.imgur.com/hOnaxX6.png)

登入聊天室介面後，會跳出登入成功的chrome notification，在畫面的左上角會顯示自己的username跟email，左邊中間會顯示目前在哪些聊天室中，左下方則是三種功能的按鍵，右上方會顯示目前聊天室的名字，右邊中間是聊天室的內容，每個帳號剛進來都會有public聊天室，右下方是輸入對話內容的輸入框，在輸入框中輸入文字後，按下最右邊的按鈕就可以發送訊息。

#### 切換聊天室
在有超過一個聊天室的情況下，可以按下想進入的聊天室，便可以進入聊天室
#### 聊天室窗口
在聊天室窗口會顯示目前聊天室中的對話紀錄，若對話內容是目前帳號所留下的話，對話會靠右排列，其餘的對話則會靠左排列。
#### 登出
按下左下方最左邊的按鈕可以登出，登出後會顯示登出成功的chrome notification。
#### 新增聊天室
按下左下方中間的按鈕可以新增聊天室，按下後會跳出提示窗口，可以輸入新聊天室的名字，按下確認後就可以新增聊天室，要注意新增聊天室後並不會切換目前的聊天室位置。
#### 邀請
按下左下方最右邊的按鈕可以讓其他人加入目前顯示的聊天室，按下後會跳出提示窗口，可以輸入想邀請的人的email，成功加入的話會跳出chrome notification，同時聊天室也會顯示誰加入了聊天室的系統訊息，若加入的人已經在該聊天室中的話，會跳出此人已經在聊天室的chrome notification，若加入的人沒有辦過帳號的話，則按下確認後不會有任何反應。
#### RWD
若畫面視窗太小，畫面會自動分割成上下兩塊，上面會是下面會是原內容的右半部分會是原內容的右半部分
:::

### Bonus Function description

none

### Firebase page link

https://chatroom-3ca09.firebaseapp.com/


### Others (Optional)

:::warning
1.聊天室的聊天內容更新時可能會稍微有些卡頓，操作時要稍微等一下。
2.sign in with google在初次登陸時可以使用，第二次再用sign in with google會有換不了畫面的問題(但是在本地端可以)，如果遇到這問題還請麻煩助教試試看其他瀏覽器，如edge。
:::

<style>
table th{
    width: 100%;
}
</style>