#!/usr/bin/env python3

#Tool to get a clean tree view of all the groups and users that
#This program has been made by GrimalDev
#github.com/GrimalDev

import grp
from operator import indexOf

groups          = grp.getgrall()
beginInStr      = "├──"
isInStr         = "│   ├──"
endStr          = "└──"
endInStr        = "│   └──"
isInEndStr      = "    ├──"
finalEndInStr   = "    └──"

def appendGroups(groups):
    groupList   = []

    for group in groups:
        if group[3]:
            groupList.append(group[0])
    return groupList

def workWithData(groups):
    groupList = appendGroups(groups)

    for group in groups:
        groupName = group[0]
        users = group[3]

        if group[3]:
            if groupName == groupList[-1]:
                print(endStr + groupName)
                for user in users:
                    if users.index(user) == len(users)-1:
                        print(finalEndInStr, user)
                    else:
                        print(isInEndStr, user)
            else:
                print(beginInStr + groupName)
                for user in users:
                    if users.index(user) == len(users)-1:
                        print(endInStr, user)
                    else:
                        print(isInStr, user)
    return

print("│")
workWithData(groups)
