
(function () {
  "use strict";
 
  // SHA-256 of the correct flag. The flag text itself is not stored here.
  var FLAG_HASH = "ebc550f38f77e1acd3fc1a81a7e3755920d5d0215d2a33fcb604d98d1a182e57";
 
  var LOG_LINES = [
    "[2024-03-15 13:40:04] PID=3440 PPID=7019 USER=SYSTEM     PROC=C:\\Windows\\System32\\SkypeApp.exe STATUS=ALLOWED",
    "[2024-03-15 13:40:19] PID=7052 PPID=7375 USER=rwilliams  PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 13:40:29] PID=5917 PPID=1134 USER=mchen      PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 13:40:36] PID=2472 PPID=2330 USER=dthompson  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 13:40:43] PID=1091 PPID=3262 USER=jsmith     PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 13:41:00] PID=2824 PPID=2824 USER=SYSTEM     PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 13:41:17] PID=6657 PPID=9302 USER=mchen      PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 13:41:30] PID=6650 PPID=8359 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 13:41:44] PID=7295 PPID=9302 USER=mchen      PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 13:41:53] PID=6503 PPID=5917 USER=SYSTEM     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 13:42:00] PID=5506 PPID=2824 USER=jsmith     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 13:42:22] PID=4634 PPID=3865 USER=SYSTEM     PROC=C:\\Windows\\System32\\conhost.exe STATUS=ALLOWED",
    "[2024-03-15 13:42:31] PID=6163 PPID=3309 USER=jsmith     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 13:42:59] PID=6581 PPID=8220 USER=rwilliams  PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED",
    "[2024-03-15 13:43:12] PID=3309 PPID=7980 USER=agupta     PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 13:43:14] PID=7704 PPID=3309 USER=dthompson  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 13:43:20] PID=9279 PPID=5506 USER=rwilliams  PROC=C:\\Users\\rwilliams\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:43:42] PID=9163 PPID=3309 USER=mchen      PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 13:43:47] PID=3409 PPID=9295 USER=SYSTEM     PROC=C:\\Users\\SYSTEM\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:44:05] PID=6770 PPID=1150 USER=agupta     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 13:44:18] PID=5118 PPID=3378 USER=agupta     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 13:44:48] PID=1291 PPID=6770 USER=mchen      PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 13:45:12] PID=6941 PPID=5046 USER=jsmith     PROC=C:\\Windows\\System32\\conhost.exe STATUS=ALLOWED",
    "[2024-03-15 13:45:20] PID=2525 PPID=4950 USER=mchen      PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 13:45:37] PID=3196 PPID=4105 USER=agupta     PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 13:45:55] PID=3723 PPID=3378 USER=mchen      PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 13:46:08] PID=7308 PPID=4468 USER=dthompson  PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 13:46:10] PID=3120 PPID=6232 USER=mchen      PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 13:46:14] PID=6412 PPID=6337 USER=jsmith     PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 13:46:19] PID=7445 PPID=6534 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 13:46:34] PID=9010 PPID=9010 USER=agupta     PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED",
    "[2024-03-15 13:46:48] PID=1107 PPID=3262 USER=dthompson  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 13:46:52] PID=8176 PPID=7919 USER=dthompson  PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 13:47:07] PID=2306 PPID=6223 USER=jsmith     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 13:47:34] PID=8432 PPID=3309 USER=agupta     PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 13:47:35] PID=9945 PPID=9163 USER=SYSTEM     PROC=C:\\Windows\\System32\\SkypeApp.exe STATUS=ALLOWED",
    "[2024-03-15 13:47:40] PID=4764 PPID=5106 USER=rwilliams  PROC=C:\\Windows\\System32\\SkypeApp.exe STATUS=ALLOWED",
    "[2024-03-15 13:47:44] PID=3275 PPID=5106 USER=SYSTEM     PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 13:47:47] PID=6668 PPID=1603 USER=jsmith     PROC=C:\\Users\\jsmith\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:47:52] PID=1775 PPID=3196 USER=jsmith     PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:00] PID=6650 PPID=8359 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:00] PID=1434 PPID=4105 USER=rwilliams  PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:01] PID=9421 PPID=6417 USER=SYSTEM     PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:04] PID=8027 PPID=9320 USER=agupta     PROC=C:\\Users\\agupta\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:36] PID=3254 PPID=4498 USER=dthompson  PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:37] PID=7609 PPID=6232 USER=SYSTEM     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:39] PID=9217 PPID=9145 USER=rwilliams  PROC=C:\\Windows\\System32\\taskhostw.exe STATUS=ALLOWED",
    "[2024-03-15 13:48:46] PID=4729 PPID=1921 USER=mchen      PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 13:49:19] PID=6223 PPID=6232 USER=jsmith     PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 13:49:22] PID=7762 PPID=2107 USER=dthompson  PROC=C:\\Windows\\System32\\spoolsv.exe STATUS=ALLOWED",
    "[2024-03-15 13:49:23] PID=9320 PPID=5046 USER=dthompson  PROC=C:\\Windows\\System32\\spoolsv.exe STATUS=ALLOWED",
    "[2024-03-15 13:49:28] PID=3865 PPID=1446 USER=agupta     PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 13:49:55] PID=8205 PPID=1107 USER=mchen      PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 13:50:12] PID=1635 PPID=1635 USER=jsmith     PROC=C:\\Users\\jsmith\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:50:19] PID=9145 PPID=2049 USER=dthompson  PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 13:50:22] PID=5776 PPID=9675 USER=dthompson  PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 13:50:29] PID=6716 PPID=7762 USER=mchen      PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED",
    "[2024-03-15 13:50:36] PID=3565 PPID=9622 USER=agupta     PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 13:51:12] PID=3639 PPID=4418 USER=jsmith     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 13:51:14] PID=1150 PPID=8027 USER=mchen      PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 13:51:14] PID=9586 PPID=6223 USER=agupta     PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 13:51:40] PID=2824 PPID=2824 USER=SYSTEM     PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 13:51:56] PID=4518 PPID=9295 USER=rwilliams  PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 13:52:07] PID=2049 PPID=6434 USER=agupta     PROC=C:\\Windows\\System32\\conhost.exe STATUS=ALLOWED",
    "[2024-03-15 13:52:19] PID=2330 PPID=4950 USER=dthompson  PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 13:52:24] PID=6417 PPID=1134 USER=jsmith     PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 13:52:42] PID=1596 PPID=2730 USER=jsmith     PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 13:53:07] PID=8172 PPID=2457 USER=agupta     PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 13:53:09] PID=5557 PPID=8172 USER=dthompson  PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 13:53:19] PID=5062 PPID=8665 USER=SYSTEM     PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 13:54:04] PID=5869 PPID=6534 USER=mchen      PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED",
    "[2024-03-15 13:54:07] PID=3036 PPID=6223 USER=dthompson  PROC=C:\\Users\\dthompson\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:54:14] PID=2823 PPID=1291 USER=rwilliams  PROC=C:\\Windows\\System32\\audiodg.exe STATUS=ALLOWED",
    "[2024-03-15 13:54:20] PID=5506 PPID=2824 USER=jsmith     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 13:54:24] PID=6281 PPID=3815 USER=rwilliams  PROC=C:\\Windows\\System32\\audiodg.exe STATUS=ALLOWED",
    "[2024-03-15 13:54:31] PID=1645 PPID=7789 USER=SYSTEM     PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 13:54:43] PID=6536 PPID=7609 USER=jsmith     PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 13:55:00] PID=2820 PPID=3565 USER=dthompson  PROC=C:\\Users\\dthompson\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:55:08] PID=9430 PPID=7516 USER=agupta     PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 13:55:10] PID=6650 PPID=8359 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 13:55:18] PID=8101 PPID=8101 USER=jsmith     PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 13:55:37] PID=3029 PPID=6536 USER=SYSTEM     PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 13:55:47] PID=3378 PPID=1980 USER=jsmith     PROC=C:\\Users\\jsmith\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:56:03] PID=1983 PPID=8027 USER=mchen      PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 13:56:30] PID=5415 PPID=6417 USER=agupta     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 13:56:35] PID=6337 PPID=8700 USER=agupta     PROC=C:\\Windows\\System32\\spoolsv.exe STATUS=ALLOWED",
    "[2024-03-15 13:56:58] PID=6839 PPID=2075 USER=mchen      PROC=C:\\Windows\\System32\\SkypeApp.exe STATUS=ALLOWED",
    "[2024-03-15 13:57:02] PID=2107 PPID=1980 USER=rwilliams  PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 13:57:06] PID=9302 PPID=4807 USER=rwilliams  PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED",
    "[2024-03-15 13:57:28] PID=7919 PPID=1785 USER=jsmith     PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 13:57:36] PID=5211 PPID=4518 USER=rwilliams  PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 13:58:20] PID=9279 PPID=5506 USER=rwilliams  PROC=C:\\Users\\rwilliams\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 13:58:28] PID=7999 PPID=6434 USER=rwilliams  PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 13:58:30] PID=4828 PPID=1033 USER=agupta     PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 13:58:40] PID=3856 PPID=9622 USER=jsmith     PROC=C:\\Windows\\System32\\dllhost.exe STATUS=ALLOWED",
    "[2024-03-15 13:58:47] PID=7980 PPID=9120 USER=SYSTEM     PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 13:58:49] PID=2457 PPID=1446 USER=mchen      PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 13:58:58] PID=4498 PPID=8101 USER=dthompson  PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 14:00:00] PID=8665 PPID=9145 USER=SYSTEM     PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:00:16] PID=3206 PPID=1980 USER=dthompson  PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 14:00:42] PID=4026 PPID=1980 USER=rwilliams  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:00:45] PID=2970 PPID=1983 USER=SYSTEM     PROC=C:\\Users\\SYSTEM\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:00:46] PID=8220 PPID=7919 USER=agupta     PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:00:50] PID=2353 PPID=4729 USER=mchen      PROC=C:\\Users\\mchen\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:00:53] PID=3693 PPID=7803 USER=agupta     PROC=C:\\Windows\\System32\\taskhostw.exe STATUS=ALLOWED",
    "[2024-03-15 14:01:40] PID=2507 PPID=1980 USER=agupta     PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 14:01:42] PID=2701 PPID=6058 USER=jsmith     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 14:01:47] PID=4580 PPID=9717 USER=SYSTEM     PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:01:58] PID=2439 PPID=6223 USER=dthompson  PROC=C:\\Windows\\System32\\dllhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:01:59] PID=1001 PPID=2792 USER=rwilliams  PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 14:02:01] PID=9839 PPID=2507 USER=jsmith     PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 14:02:06] PID=5839 PPID=3275 USER=agupta     PROC=C:\\Windows\\System32\\SkypeApp.exe STATUS=ALLOWED",
    "[2024-03-15 14:02:21] PID=7803 PPID=1107 USER=mchen      PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 14:02:30] PID=6650 PPID=8359 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 14:02:30] PID=2462 PPID=5917 USER=jsmith     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:02:40] PID=8230 PPID=6163 USER=agupta     PROC=C:\\Windows\\System32\\spoolsv.exe STATUS=ALLOWED",
    "[2024-03-15 14:03:17] PID=9599 PPID=3815 USER=rwilliams  PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 14:03:20] PID=2824 PPID=2824 USER=SYSTEM     PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 14:03:23] PID=4418 PPID=6223 USER=SYSTEM     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:03:29] PID=4653 PPID=3815 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 14:03:50] PID=6434 PPID=6434 USER=jsmith     PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 14:04:07] PID=8751 PPID=9302 USER=jsmith     PROC=C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe STATUS=ALLOWED",
    "[2024-03-15 14:04:19] PID=7375 PPID=5557 USER=jsmith     PROC=C:\\Windows\\System32\\dllhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:04:41] PID=8999 PPID=2049 USER=dthompson  PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:04:44] PID=6175 PPID=6412 USER=dthompson  PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 14:04:55] PID=8836 PPID=3262 USER=rwilliams  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:05:00] PID=5506 PPID=2824 USER=jsmith     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 14:05:21] PID=9674 PPID=6417 USER=SYSTEM     PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 14:05:25] PID=7019 PPID=1983 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 14:05:27] PID=5590 PPID=4729 USER=rwilliams  PROC=C:\\Windows\\System32\\dllhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:05:28] PID=4980 PPID=6657 USER=jsmith     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 14:06:04] PID=4468 PPID=6490 USER=jsmith     PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 14:07:10] PID=3780 PPID=6434 USER=rwilliams  PROC=C:\\Users\\rwilliams\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:07:23] PID=2096 PPID=8220 USER=rwilliams  PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:07:33] PID=8283 PPID=6223 USER=rwilliams  PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:07:33] PID=4965 PPID=1134 USER=dthompson  PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 14:07:33] PID=7996 PPID=8113 USER=SYSTEM     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:07:34] PID=3815 PPID=3780 USER=agupta     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:07:39] PID=1603 PPID=2049 USER=dthompson  PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 14:08:01] PID=5046 PPID=3780 USER=SYSTEM     PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 14:08:01] PID=4950 PPID=9010 USER=jsmith     PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 14:08:12] PID=9295 PPID=8101 USER=agupta     PROC=C:\\Windows\\System32\\conhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:08:13] PID=1497 PPID=4518 USER=rwilliams  PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 14:08:36] PID=6534 PPID=5046 USER=jsmith     PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 14:08:46] PID=2712 PPID=9295 USER=jsmith     PROC=C:\\Windows\\System32\\taskhostw.exe STATUS=ALLOWED",
    "[2024-03-15 14:09:04] PID=1971 PPID=4026 USER=agupta     PROC=C:\\Users\\agupta\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:09:08] PID=5992 PPID=7789 USER=rwilliams  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:09:30] PID=4888 PPID=5869 USER=rwilliams  PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 14:09:34] PID=8113 PPID=7789 USER=jsmith     PROC=C:\\Windows\\System32\\audiodg.exe STATUS=ALLOWED",
    "[2024-03-15 14:09:45] PID=6058 PPID=1434 USER=dthompson  PROC=C:\\Windows\\System32\\taskhostw.exe STATUS=ALLOWED",
    "[2024-03-15 14:09:56] PID=9120 PPID=6434 USER=dthompson  PROC=C:\\Windows\\System32\\conhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:10:00] PID=6650 PPID=8359 USER=agupta     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 14:10:19] PID=7516 PPID=6232 USER=SYSTEM     PROC=C:\\Windows\\System32\\conhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:10:33] PID=7626 PPID=1983 USER=mchen      PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED",
    "[2024-03-15 14:10:36] PID=3262 PPID=3120 USER=SYSTEM     PROC=C:\\Windows\\System32\\backgroundTaskHost.exe STATUS=ALLOWED",
    "[2024-03-15 14:10:45] PID=3003 PPID=6839 USER=rwilliams  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:11:21] PID=2075 PPID=7704 USER=jsmith     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 14:11:39] PID=1134 PPID=1635 USER=dthompson  PROC=C:\\Windows\\System32\\audiodg.exe STATUS=ALLOWED",
    "[2024-03-15 14:11:40] PID=9279 PPID=5506 USER=rwilliams  PROC=C:\\Users\\rwilliams\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:11:45] PID=1785 PPID=4518 USER=jsmith     PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:12:06] PID=2792 PPID=1980 USER=dthompson  PROC=C:\\Users\\dthompson\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:12:09] PID=1070 PPID=6303 USER=SYSTEM     PROC=C:\\Windows\\System32\\taskhostw.exe STATUS=ALLOWED",
    "[2024-03-15 14:12:11] PID=4105 PPID=2507 USER=rwilliams  PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 14:12:31] PID=4039 PPID=5917 USER=dthompson  PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:13:12] PID=8134 PPID=2472 USER=dthompson  PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 14:13:24] PID=6808 PPID=9302 USER=SYSTEM     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 14:13:32] PID=4807 PPID=1980 USER=mchen      PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 14:13:32] PID=6490 PPID=6223 USER=agupta     PROC=C:\\Windows\\System32\\conhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:13:41] PID=6065 PPID=1091 USER=jsmith     PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED",
    "[2024-03-15 14:14:34] PID=6886 PPID=3309 USER=SYSTEM     PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 14:14:51] PID=5895 PPID=8172 USER=SYSTEM     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:14:59] PID=1446 PPID=4807 USER=dthompson  PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 14:15:00] PID=5506 PPID=2824 USER=jsmith     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 14:15:00] PID=9622 PPID=7704 USER=SYSTEM     PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 14:15:01] PID=1980 PPID=6434 USER=rwilliams  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:15:02] PID=7210 PPID=4729 USER=mchen      PROC=C:\\Users\\mchen\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:15:10] PID=2166 PPID=3029 USER=dthompson  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:15:13] PID=6893 PPID=7999 USER=SYSTEM     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:16:03] PID=5226 PPID=4418 USER=jsmith     PROC=C:\\Windows\\System32\\explorer.exe STATUS=ALLOWED",
    "[2024-03-15 14:16:06] PID=1139 PPID=5415 USER=jsmith     PROC=C:\\Windows\\System32\\svchost.exe STATUS=ALLOWED",
    "[2024-03-15 14:16:07] PID=4183 PPID=7789 USER=dthompson  PROC=C:\\Windows\\System32\\SkypeApp.exe STATUS=ALLOWED",
    "[2024-03-15 14:16:12] PID=6303 PPID=7019 USER=dthompson  PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:16:16] PID=6465 PPID=3262 USER=agupta     PROC=C:\\Windows\\System32\\dllhost.exe STATUS=ALLOWED",
    "[2024-03-15 14:16:34] PID=1033 PPID=2457 USER=rwilliams  PROC=C:\\Windows\\System32\\winword.exe STATUS=ALLOWED",
    "[2024-03-15 14:17:05] PID=5106 PPID=6223 USER=SYSTEM     PROC=C:\\Users\\SYSTEM\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe STATUS=ALLOWED",
    "[2024-03-15 14:17:12] PID=8700 PPID=2792 USER=mchen      PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:17:15] PID=5554 PPID=5554 USER=agupta     PROC=C:\\Windows\\System32\\spoolsv.exe STATUS=ALLOWED",
    "[2024-03-15 14:17:30] PID=6650 PPID=8359 USER=agupta     PROC=C:\\Users\\agupta\\AppData\\Local\\Temp\\suspicious_evil_virus.exe STATUS=BLOCKED",
    "[2024-03-15 14:17:32] PID=6489 PPID=2306 USER=jsmith     PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:17:38] PID=6931 PPID=7445 USER=rwilliams  PROC=C:\\Windows\\System32\\outlook.exe STATUS=ALLOWED",
    "[2024-03-15 14:18:08] PID=9518 PPID=7980 USER=rwilliams  PROC=C:\\Windows\\System32\\wermgr.exe STATUS=ALLOWED",
    "[2024-03-15 14:18:16] PID=5019 PPID=9120 USER=dthompson  PROC=C:\\Windows\\System32\\notepad.exe STATUS=ALLOWED",
    "[2024-03-15 14:18:18] PID=5520 PPID=1150 USER=mchen      PROC=C:\\Windows\\System32\\audiodg.exe STATUS=ALLOWED",
    "[2024-03-15 14:18:20] PID=2824 PPID=2824 USER=SYSTEM     PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 14:18:54] PID=7789 PPID=6490 USER=SYSTEM     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:05] PID=1921 PPID=4498 USER=dthompson  PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:06] PID=9717 PPID=6163 USER=mchen      PROC=C:\\Windows\\System32\\spoolsv.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:10] PID=6234 PPID=9599 USER=dthompson  PROC=C:\\Windows\\System32\\cmd.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:19] PID=1363 PPID=7445 USER=agupta     PROC=C:\\Windows\\System32\\powershell.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:25] PID=5800 PPID=3254 USER=mchen      PROC=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:35] PID=9675 PPID=8101 USER=SYSTEM     PROC=C:\\Windows\\System32\\SearchIndexer.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:36] PID=1108 PPID=3196 USER=dthompson  PROC=C:\\Windows\\System32\\RuntimeBroker.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:42] PID=6232 PPID=9010 USER=agupta     PROC=C:\\Windows\\System32\\Teams.exe STATUS=ALLOWED",
    "[2024-03-15 14:19:48] PID=2730 PPID=2792 USER=jsmith     PROC=C:\\Windows\\System32\\WmiPrvSE.exe STATUS=ALLOWED"
  ];
 
  var README_LINES = [
    "Incident response capture",
    "Collected: 2024-03-15",
    "Source: endpoint process-monitoring agent",
    "File: system.log  (204 process events)",
    "",
    "Each line: [timestamp] PID=... PPID=... USER=... PROC=<path> STATUS=ALLOWED|BLOCKED",
    "",
    "Tip: a normal process logs one line and exits. A process doing something",
    "it shouldn't tends to stick around and generate more activity."
  ];
 
  var FILE_CONTENTS = { "system.log": LOG_LINES, "readme.txt": README_LINES };
 
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
 
  var term = { log: $("termLog"), input: $("termInput") };
 
  function printLine(cls, html, isHtml) {
    var div = document.createElement("div");
    div.className = "line " + cls;
    if (isHtml) { div.innerHTML = html; } else { div.textContent = html; }
    term.log.appendChild(div);
    term.log.parentElement.scrollTop = term.log.parentElement.scrollHeight;
  }
  function printPrompt(cmd) {
    printLine("prompt", "investigator@forensics:~$ " + cmd);
  }
  function printLines(lines, highlightTerm) {
    if (!lines.length) { printLine("sys", "(no output)"); return; }
    for (var i = 0; i < lines.length; i++) {
      printLine("out", highlight(lines[i], highlightTerm), true);
    }
  }
  function highlight(line, needle) {
    if (!needle) return esc(line);
    var escLine = esc(line);
    var escNeedle = esc(needle).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var re = new RegExp("(" + escNeedle + ")", "ig");
    return escLine.replace(re, "<span class=\"match\">$1</span>");
  }
 
  function showHelp() {
    printLine("sys", "Available commands:");
    printLine("sys", "  help                       show this help");
    printLine("sys", "  ls                         list files");
    printLine("sys", "  cat <file>                 print a file's contents");
    printLine("sys", "  grep <term> <file>         print only lines containing <term>");
    printLine("sys", "  wc -l <file>                count lines in a file");
    printLine("sys", "  clear                      clear the terminal");
    printLine("sys", "");
    printLine("sys", "This terminal also supports pipes, just like a real shell:");
    printLine("sys", "  cat <file> | <stage> | <stage> ...");
    printLine("sys", "Pipeline stages:");
    printLine("sys", "  grep <term>                keep only lines containing <term>");
    printLine("sys", "  pids                       extract just the PID from each line");
    printLine("sys", "  sort [-n] [-r]             sort lines (numeric and/or reverse)");
    printLine("sys", "  uniq -c                    collapse consecutive duplicates, with a count");
    printLine("sys", "  head [-n N]                keep only the first N lines (default 10)");
    printLine("sys", "  wc -l                      count how many lines came through");
    printLine("sys", "");
    printLine("sys", "Example: cat system.log | pids | sort | uniq -c | sort -nr | head");
  }
 
  // Extract the PID value from a log line, carefully ignoring PPID=.
  function extractPid(line) {
    var re = /PID=(\d+)/g, m;
    while ((m = re.exec(line))) {
      var idx = m.index;
      if (line.charAt(idx - 1) !== "P") return m[1];
    }
    return null;
  }
 
  function doSort(lines, flagsStr) {
    var numeric = /n/.test(flagsStr);
    var reverse = /r/.test(flagsStr);
    var out = lines.slice().sort(function (a, b) {
      if (numeric) {
        var na = parseInt(String(a).trim().split(/\s+/)[0], 10) || 0;
        var nb = parseInt(String(b).trim().split(/\s+/)[0], 10) || 0;
        return na - nb;
      }
      return a < b ? -1 : a > b ? 1 : 0;
    });
    if (reverse) out.reverse();
    return out;
  }
 
  function doUniqC(lines) {
    var out = [];
    for (var i = 0; i < lines.length; i++) {
      if (out.length && out[out.length - 1].value === lines[i]) {
        out[out.length - 1].count++;
      } else {
        out.push({ value: lines[i], count: 1 });
      }
    }
    return out.map(function (e) { return e.count + "  " + e.value; });
  }
 
  function doHead(lines, argsStr) {
    var n = 10;
    var m = argsStr.match(/-n\s*(\d+)/) || argsStr.match(/-(\d+)/);
    if (m) n = parseInt(m[1], 10);
    return lines.slice(0, n);
  }
 
  // Run a pipeline of stages. stages[0] must be "cat <file>".
  // Returns { lines, highlightTerm } or throws a string error message.
  function runPipeline(stages) {
    var lines = null;
    var highlightTerm = null;
 
    for (var s = 0; s < stages.length; s++) {
      var stage = stages[s].trim();
      var sp = stage.indexOf(" ");
      var verb = sp === -1 ? stage : stage.slice(0, sp);
      var args = sp === -1 ? "" : stage.slice(sp + 1).trim();
 
      if (lines === null) {
        if (verb !== "cat") {
          throw "pipeline error: a pipeline must start with 'cat <file>'";
        }
        var file = args.trim();
        if (!FILE_CONTENTS.hasOwnProperty(file)) {
          throw "cat: " + file + ": No such file or directory";
        }
        lines = FILE_CONTENTS[file].slice();
        continue;
      }
 
      switch (verb) {
        case "grep":
          if (!args) throw "grep: missing search term";
          highlightTerm = args;
          lines = lines.filter(function (l) {
            return l.toLowerCase().indexOf(args.toLowerCase()) !== -1;
          });
          break;
        case "pids":
          lines = lines.map(extractPid).filter(function (x) { return x !== null; });
          break;
        case "sort":
          lines = doSort(lines, args);
          break;
        case "uniq":
          if (args.trim() !== "-c") throw "uniq: this terminal only supports 'uniq -c'";
          lines = doUniqC(lines);
          break;
        case "head":
          lines = doHead(lines, args);
          break;
        case "wc":
          if (args.trim() !== "-l") throw "wc: this terminal only supports 'wc -l'";
          lines = [String(lines.length)];
          break;
        default:
          throw verb + ": command not found in pipeline";
      }
    }
    return { lines: lines, highlightTerm: highlightTerm };
  }
 
  function runCommand(raw) {
    var cmd = raw.trim();
    printPrompt(raw);
    if (cmd === "") return;
 
    if (cmd === "help") { showHelp(); return; }
    if (cmd === "ls") { printLine("out", "system.log  readme.txt"); return; }
    if (cmd === "clear") { term.log.innerHTML = ""; return; }
 
    if (cmd.indexOf("|") !== -1) {
      var stages = cmd.split("|");
      try {
        var result = runPipeline(stages);
        printLines(result.lines, result.highlightTerm);
      } catch (err) {
        printLine("bad", String(err));
      }
      return;
    }
 
    if (cmd.indexOf("cat ") === 0) {
      var catFile = cmd.slice(4).trim();
      try {
        var r = runPipeline(["cat " + catFile]);
        printLines(r.lines, null);
      } catch (err) { printLine("bad", String(err)); }
      return;
    }
 
    if (cmd.indexOf("grep ") === 0) {
      var words = cmd.slice(5).trim().split(/\s+/);
      if (words.length < 2) {
        printLine("bad", "grep: missing file operand. Try: cat system.log | grep <term>");
        return;
      }
      var gFile = words[words.length - 1];
      var gTerm = words.slice(0, -1).join(" ");
      if (!FILE_CONTENTS.hasOwnProperty(gFile)) {
        printLine("bad", "grep: " + gFile + ": No such file or directory");
        return;
      }
      try {
        var r2 = runPipeline(["cat " + gFile, "grep " + gTerm]);
        printLines(r2.lines, r2.highlightTerm);
      } catch (err) { printLine("bad", String(err)); }
      return;
    }
 
    if (cmd.indexOf("wc ") === 0) {
      var wParts = cmd.slice(3).trim().split(/\s+/);
      if (wParts[0] === "-l" && wParts[1] && FILE_CONTENTS.hasOwnProperty(wParts[1])) {
        try {
          var r3 = runPipeline(["cat " + wParts[1], "wc -l"]);
          printLines(r3.lines, null);
        } catch (err) { printLine("bad", String(err)); }
        return;
      }
      printLine("bad", "usage: wc -l <file>");
      return;
    }
 
    if (cmd === "sort" || cmd.indexOf("sort ") === 0 ||
        cmd === "uniq" || cmd.indexOf("uniq ") === 0 ||
        cmd === "pids" || cmd === "head" || cmd.indexOf("head ") === 0) {
      printLine("bad", cmd.split(" ")[0] + ": needs input piped in, e.g. cat system.log | " + cmd);
      return;
    }
 
    printLine("bad", cmd.split(" ")[0] + ": command not found. Type 'help' for a list of commands.");
  }
 
  term.input.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var val = term.input.value;
    term.input.value = "";
    runCommand(val);
  });
 
  printLine("sys", "Forensics workstation ready. 1 captured log file available (204 lines). Type 'help' to get started.");
 
  // ---------- Flag checker ----------
  function showResult(cls, msg) {
    var r = $("result");
    r.className = "result " + cls;
    r.textContent = msg;
  }
 
  async function sha256(text) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }
 
  async function checkFlag() {
    var guess = $("f").value.trim();
    if (!guess) { showResult("bad", "Type a flag first."); return; }
    if (!(window.crypto && crypto.subtle)) {
      showResult("bad", "Your browser can't check flags here. Open this page over https and try again.");
      return;
    }
    if (await sha256(guess) === FLAG_HASH) {
      showResult("ok", "Correct! You traced the malicious execution back to its PID.");
      $("solved").classList.remove("hidden");
    } else {
      showResult("bad", "Not quite. Make sure the flag only contains the PID number you found.");
    }
  }
 
  $("check").addEventListener("click", checkFlag);
  $("f").addEventListener("keydown", function (e) { if (e.key === "Enter") checkFlag(); });
 
  // ---------- Hints ----------
  var hints = 0;
  var hintBtn = $("hintBtn");
  hintBtn.addEventListener("click", function () {
    if (hints < 4) {
      hints++;
      $("h" + hints).classList.add("show");
    }
    $("hintCount").textContent = "Hint " + hints + " of 4";
    if (hints === 3) hintBtn.textContent = "Show the answer";
    if (hints === 4) hintBtn.disabled = true;
  });
})();