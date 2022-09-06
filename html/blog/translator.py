f = open("test.txt", "r")
n = open("done.html", "w")

started = False
lister = False
listnum = 0
thing = ""


for i in f.readlines():
    
    i = i.replace("• ", "")
    if i[:1] == "    ":
        i = i[5:]

    i = i.replace(". ", "")
    if len(i) == 1 and lister == False:
        continue
    
    if "^B" in i:
        started = True
    
    if not started:
        n.write(f"<p class=\"introduction\">{i[:-1]}</p>\n")
    else:
        if "^B" in i:
            i = i.replace("^B","")
            n.write(f"""<div class="h2-container" id="">
                    <span class="fas fa-link" onclick="copyHeading()"></span>
                    <h2>{i[:-1]}</h2>
                    </div>\n""")
        elif "^U" in i:
            i = i.replace("^U","")
            lister = True
            n.write(f"<p style=\"padding-bottom: 2rem\">{i[:-1]}</p>\n")
            n.write(f"<ul class=\"list{listnum}\">\n")
            listnum += 1
            thing = "</ul>"
    
        elif "^O" in i:
            i = i.replace("^O","")
            lister = True
            n.write(f"<p style=\"padding-bottom: 2rem\">{i[:-1]}</p>\n")
            n.write(f"<ol class=\"list{listnum}\">\n")
            listnum += 1
            thing = "</ol>"

        elif lister and len(i) == 1:
            lister = False
            n.write(thing)
     
        elif lister:
            n.write(f"<li>{i[:-1]}</li>\n")
            
        
        else: 
            n.write(F"<p>{i[:-1]}</p>")

        
        
        
