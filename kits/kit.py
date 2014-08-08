import os, sys

json = """{"kit": ["""
try:
	sounds = os.listdir(sys.argv[1])
	names = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Z','0','1','2','3','4','5','6','7','8','9']
	index = 0
	output = open(sys.argv[1]+'/kit.json', 'w')

	for file in sounds:
		if not file[0] == '.':
			try:
				json += """{\"ref\": \"%s\", \"file\": \"%s\"},""" %(names[index], file)
				index = index + 1	
			except:
				print "Sounds limit exceded"
				break

	json = json[:-1] + """]}"""
	output.write(json)

except:
	print """
LoopJS Kit Generator
More in: http://openbeats.tumblr.com

Usage: python kit.py [kit_directory_name]

"""