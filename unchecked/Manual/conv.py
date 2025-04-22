# this is for
# pandoc -s aaa.tex -o aaa.docx
import re,sys,string
inputfile='ecaljmanual.tex'
outputfile = 'aaa.tex'
eman = open(inputfile,'r').readlines()
writefile = open(outputfile,'w')
for line in eman:
        eee = re.sub(r'\\verb\#(.+?)\#',r'\\verb@\1@', line) 
        eee = re.sub(r'\\verb\%(.+?)\%',r'\\verb@\1@', eee) 
        eee = re.sub(r'\\verb\!(.+?)\!',r'\\verb@\1@', eee) 
        eee = re.sub(r'_',r'UUUUUU', eee) 
        outl = eee
        writefile.write(outl)
writefile.close()
