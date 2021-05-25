#!/bin/bash

#definition
blue='\033[36m'
red='\033[31m'
green='\033[32m'
nC='\033[0m'
#Compiler part----------------
compile () {
	#initialisation
	#user asks
	printf "${nC}${blue}"
	path_error=""
	printf 'Insert the file path of (/root/path_to_file/file.cpp):\n   > '
	printf "${nC}"
	read file_path
	printf "${blue}"
	if [ ! -f "${file_path}" ];then
		printf "${nC}${red}"
		printf "	File not found!\n"
		printf "${nC}${blue}"
		path_error="error"
		while [ "$path_error" == "error" ]; do
			printf 'Insert the file path (/root/path_to_file/file.cpp/):\n   > '
			printf "${nC}"
			read file_path
			printf "${blue}"
			if [ ! -f $file_path ];then
				printf "${nC}${red}"
				printf "	File not found!\n"
				printf "${nC}${blue}"
				path_error="error"
			else
				printf "${nC}${green}"
				printf '	**found!**\n'
				printf "${nC}${blue}"
				path_error=""
			fi
		done
	else
		printf "${nC}${green}"
		printf '	**found!**\n'
		printf "${nC}${blue}"
	fi

	printf 'Insert the final compile name (my_file_name):\n   > '
	printf "${nC}"
	read name
	printf "${blue}"
	terminal_bool_error=""
	printf 'Does your C++ file need to lunch in a terminal? (y/n)\n   > '
	printf "${nC}"
	read terminal_bool
	printf "${blue}"
	terminal="false"
	if [ "$terminal_bool" == y ] || [ "$terminal_bool" == Y ]; then
		printf "${green}"
		printf '    **Terminal Needed**\n'
		printf "${nC}${blue}"
		terminal="true"
	elif [ "$terminal_bool" == n ] || [ "$terminal_bool" == N ]; then
		printf "${green}"
		printf '	**No Terminal Needed**\n'
		printf "${nC}${blue}"
	else
		printf "${nC}${red}"
		printf '	Wrong value...\n'
		printf "${nC}${blue}"
		terminal_bool_error="error"
		while [ "$terminal_bool_error" == "error" ]; do
			printf 'Does your C++ file need to lunch in a terminal? (y/n)\n   > '
			printf "${nC}"
			read terminal_bool
			if [ "$terminal_bool" == y ] || [ "$terminal_bool" == Y ]; then
				printf "${green}"
				printf '    **Terminal Needed**\n'
				printf "${nC}${blue}"
				terminal="true"
				terminal_bool_error=""
			elif [ "$terminal_bool" == n ] || [ "$terminal_bool" == N ]; then
				printf "${nC}${green}"
				printf '	**No Terminal Needed**\n'
				printf "${nC}${blue}"
				terminal_bool_error=""
			else
				printf "${nC}${red}"
				printf '	Wrong value...\n'
				printf "${nC}${blue}"
				terminal_bool_error="error"
			fi
		done
	fi

	icon_path=""
	printf 'Do you want a customize icon of the luncher? (y/n)\n   > '
	printf "${nC}"
	read icon
	printf "${blue}"
	if [ "$icon" == "y" ] || [ "$icon" == "Y" ]; then
		printf 'Insert the icon file path (/root/path_to_icon/icon.png/)\n'
		printf 'If you want to cancel the icon (STOP)\n   > '
		printf "${nC}"
		read icon_path
		printf "${blue}"
		if [ "$icon_path" == "STOP" ]; then
			icon_path="/root/cppFolder/Compiler/default.png"
			icon_path_error=""
		fi
		if [ ! -f "${icon_path}" ]; then
			printf "${nC}${red}"
			printf "	File not found!\n"
			printf "${nC}${blue}"
			icon_path_error="error"
			while [ "$icon_path_error" == "error" ]; do
				printf 'Insert the icon file path (/root/path_to_icon/icon.png/)\n'
				printf 'If you want to cancel the icon (STOP)\n   > '
				printf "${nC}"
				read icon_path
				printf "${blue}"
				if [ "$icon_path" == "STOP" ]; then
					icon_path="/root/cppFolder/Compiler/default.png"
					printf "${nC}${green}"
					printf '	**Default icon seted!**\n'
					printf "${nC}${blue}"
					icon_path_error=""
				fi
				if [ ! -f $icon_path ]; then
					printf "${nC}${red}"
					printf "	File not found!"
					printf "${nC}${blue}"
					icon_path_error="error"
				else
					printf "${nC}${green}"
					printf '	**found!**\n'
					printf "${nC}${blue}"
					icon_path_error=""
				fi
			done
		else
			printf "${nC}${green}"
			printf '	**found!**\n'
			printf "${nC}${blue}"
		fi
	elif [ "$icon" == "n" ] || [ "$icon" == "N" ]; then
		printf "${nC}${green}"
		printf '	**Default icon selected!**\n'
		printf "${nC}${blue}"
		icon_path="/root/cppFolder/Compiler/default.png"
	else
		printf "${nC}${red}"
		printf '	Wrong value...\n'
		printf "${nC}${blue}"
		icon_path="STOP"
		while [ "$icon_path" == "STOP" ]; do
			printf 'Do you want a customize icon of the luncher? (y/n)\n   > '
			printf "${nC}"
			read icon
			printf "${blue}"
			if [ "$icon" == "y" ] || [ "$icon" == "Y" ]; then
				printf 'Insert the icon file path (/root/path_to_icon/icon.png/)\n'
				printf 'If you want to cancel the icon (STOP)\n   > '
				printf "${nC}"
				read icon_path
				printf "${blue}"
				if [ "$icon_path" == "STOP" ]; then
					printf "${nC}${green}"
					printf '	**Default icon seted!**\n'
					printf "${nC}${blue}"
					icon_path="/root/cppFolder/Compiler/default.png"
					icon_path_error=""
				fi
				icon_path="$icon_path"
				if [ ! -f "${icon_path}" ];then
					printf "${nC}${red}"
					echo "File not found!\n"
					printf "${nC}${blue}"
					icon_path_error="error"
					while [ "$icon_path_error" == "error" ]; do
						printf 'Insert the icon file path (/root/path_to_icon/icon.png/)\n'
						printf 'If you want to cancel the icon (STOP)\n   > '
						printf "${nC}"
						read icon_path
						printf "${blue}"
						if [ "$icon_path" == "STOP" ]; then
							printf "${nC}${green}"
							printf '	**Default icon seted!**\n'
							printf "${nC}${blue}"
							icon_path="/root/cppFolder/Compiler/default.png"
							icon_path_error=""
						fi
						if [ ! -f $icon_path ]; then
							printf "${nC}${red}"
							printf "	File not found!\n"
							printf "${nC}${blue}"
							icon_path_error="error"
						else
							printf "${nC}${green}"
							printf '	**found!**\n'
							printf "${nC}${blue}"
							icon_path_error=""
						fi
					done
				else
					printf "${nC}${green}"
					printf '		**found!**\n'
					printf "${nC}${blue}"
				fi
			elif [ "$icon" == "n" ] || [ "$icon" == "N" ]; then
				printf "${nC}${green}"
				printf '	**Default icon seted!**\n'
				printf "${nC}${blue}"
				icon_path=""
			else
				printf "${nC}${red}"
				printf '	Wrong value...\n'
				printf "${nC}${blue}"
				icon_path="STOP"
			fi
		done
	fi

	printf 'Where do you want the file to be created?\n   > '
	printf "${nC}"
	read main_folder_path
	printf "${blue}"
	if [ ! -d $main_folder_path ]; then
		printf "${nC}${red}"
		printf '	Directory path not found!\n'
		printf "${nC}${blue}"
		main_folder_path_error="error"
		while [ "$main_folder_path_error" == "error" ]; do
				printf 'Where do you want the file to be created?\n   > '
				printf "${nC}"
				read main_folder_path
				printf "${blue}"
				if [ ! -d $main_folder_path ]; then
					printf "${nC}${red}"
					printf '	Directory path not found!\n'
					printf "${nC}${blue}"
				else
					printf "${nC}${green}"
					printf '	**found!**\n'
					printf "${nC}${blue}"
					main_folder_path_error=""
				fi
		done
	else
		printf "${nC}${green}"
		printf '	**found!**\n'
		printf "${nC}${blue}"
	fi

	#____________________________________________________

	main_root="${main_folder_path}/${name}_root"
	#Files creation
	if [ -d $main_root ]; then
		printf "${nC}${red}"
		printf "A folder name after yout way already exists!\n"
		printf "${nC}${blue}"
		printf "Do you wish:\n      (1) To pick a new name (1)\n      (2) To remove the already existing folder (2)\n   > "
		printf "${nC}"
		read wish
		printf "${Blue}"
		if [ "${wish}" == "1" ]; then
			printf "${nC}${green}"
			printf "	**Remooving old name...**\n"
			name=""
			printf "	**Old name remooved!**\n"
			printf "${nC}${blue}"
			printf "Enter the final name you want now:\n   > "
			printf "${nC}"
			read name
			printf "${nC}${green}	**Name changed**${nC}${blue}\n"
		elif [ "${wish}" == "2" ]; then
			rm $main_root
			print "    **Old folder remooved**\n"
		else
			printf "${nC}${red}"
			printf "Wrong Value...\n"
			printf "${nC}${blue}"
			wish_error=""
			while [ "${wish_error}" != "STOP" ]; do
				printf "Do you wish:\n      (1) To pick a new name (1)\n      (2) To remove the already existing folder (2)\n   > "
				printf "${nC}"
				read wish
				printf "${Blue}"
				if [ "${wish}" == "1" ]; then
					printf "${nC}${green}"
					printf "	**Remooving old name...**\n"
					name=""
					printf "	**Old name remooved!**\n"
					printf "${nC}${blue}"
					printf "Enter the final name you want now:\n   > "
					printf "${nC}"
					read name
					printf "${nC}${green}	**Name changed**${nC}${blue}\n"
				elif [ "${wish}" == "2" ]; then
					rm $main_root
					print "    **Old folder remooved**\n"
				else
					printf "${nC}${red}"
					printf "Wrong Value...\n"
					printf "${nC}${blue}"
					wish_error=""
				fi
			done
		fi
	fi

	printf "${nC}${green}"
	printf "	**Creating the root folder**\n"
	mkdir -p main_root

	#main root folder

	if [ "${icon_path}"=="/root/cppFolder/Compiler/default.png" ]; then
		printf "	**Compiling the cpp file with the default icon...**\n"
	else
		printf "	**Compiling the cpp file with your choosen icon...**\n"
	fi

	printf "	**Checking if you have already the bild build-essential package...**\n"
	if [ ! -d /usr/share/build-essential ]; then
		printf "	**You do not!**\n	**Installing necessary library**\n"
		sudo apt-get install build-essential

		printf "	**Updating the apt-get library**\n"
		sudo apt-get update
	else
		printf "	**You do!**\n"
	fi

		#compilation
	printf "	**Compiling...**\n${nC}${red}"
	cd $main_root
	printf "${nC}${green}	**Generating binary...**${nC}${red}\n"
	gcc $file_path -o "${name}"
	if [ ! -f $main_root/$name ]; then
		printf "${nC}${red}Generation binary failed${nC}${green}\n"
	else
		print "${nC}${green}    **Generation successful**\n"
	fi
		#making it axecutable
	printf "	**Generating the desktop application**\n"
	printf "${red}"
	printf "[Desktop Entry]\nName=${name}\nEncoding=UTF-8\nExec=.${main_root}/run.sh\nTerminal=${terminal}\nIcon=${icon_path}\nType=Application\nCategories=Compilation;Programmation" > $main_root/$name.desktop
	if [ ! -f $main_root/$name.desktop ]; then
		printf "${nC}${red}Generating the desktop application failed${nC}${red}\n"
	else
		printf "${nC}${green}	**Generation successful**${nC}${red}\n"
	fi

	printf "${nC}${green}	**Creating the run bash**\n${nC}${red}"
	printf "#/bin/bash\n${main_root}\n\$SHELL" > $main_root/run.sh
	if [ ! -f $main_root/run.sh ]; then
		printf "${nC}${red}Generating the run failed${nC}${red}\n"
	else
		printf "${nC}${green}	**Generation successful**${nC}${blue}\n"
	fi
	#____________________________________________________
	#ending
	printf "${nC}"
}

#banner----------------
printf "${blue}"
figlet "Compiler"
printf "${nC} ${green}"
figlet -f digital "Welcome to the c++ compiler!"
printf "${nC}"

#main root-------------
printf "${nC}${blue}"
main_error=""
printf "Do you want to compile a standard cpp file?(y/n):\n   > "
printf "${nC}"
read choice
printf "${blue}"
if [ "$choice" == "y" ] || [ "$choice" == "Y" ]
then
	compile
elif [ "$choice" == "n" ] || [ "$choice" == "N" ]
then
	printf "${nC}${red}"
	printf 'The feature of multiple files is not available yet...
		SORRY!\n'
		printf "${nC}${blue}"
else
	printf "${nC}${red}"
	printf 'Wrong value...\n'
	printf "${nC}${blue}"
	main_error="error"
	while [ "$main_error" == "error" ]; do
		printf "Do you want to compile a standard cpp file?(y/n):\n   > "
		printf "${nC}"
		read choice
		printf "${blue}"
		if [ "$choice" == "y" ] || [ "$choice" == "Y" ]
		then
			compile
			main_error=""
		elif [ "$choice" == "n" ] || [ "$choice" == "N" ]
		then
			printf "${nC}${red}"
			printf 'The feature of multiple files is not available yet...
				SORRY!\n'
			printf "${nC}${blue}"
			main_error=""
		else
			printf "${nC}${red}"
			printf 'Wrong value...\n'
			printf "${nC}${blue}"
			main_error="error"
		fi
	done
fi
printf "${nC}"
#end goodbye--------------
printf "${green}"
figlet -f digital "Goodbye"
printf "${nC}"