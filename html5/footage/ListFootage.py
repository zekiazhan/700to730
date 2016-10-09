import os
import sys

files = os.listdir("./")

insertScaleA = 0
insertScaleB = 2

deltaTime = 60
if len(sys.argv) > 1:
	deltaTime = float(sys.argv[1])

fout = open("Footage.js",'w')

fout.write("var videoSources = [\n")

for file in files:
	if file.endswith(".mp4"):
		list = file.split('_')
		if (list[0].isdigit()):
			framID = int(list[0])
			beginTime = (framID-7) * deltaTime
			endTime = (framID-6) * deltaTime
			data = fout.write("[\'" + file[:-4] +"\',0," + str(insertScaleA) + "," + str(beginTime) + "," + str(endTime) + "],\n")
			data = fout.write("[\'" + file[:-4] +"\',0," + str(insertScaleB) + "," + str(beginTime) + "," + str(endTime) + "],\n")

fout.write("]")