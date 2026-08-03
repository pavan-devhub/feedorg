import re

with open('c:/Users/Pavan/feed/src/components/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

nav_start = content.rfind('      {/* 3. Navigation Bar')
nav_end = content.find('      {/* 4. Video Section')

if nav_start != -1 and nav_end != -1:
    nav_code = content[nav_start:nav_end]
    
    # Update styles to make it flow
    nav_code = re.sub(
        r"position: 'absolute',\s*top: '80px',\s*left: 0,\s*right: 0,\s*zIndex: 50,\s*height: 0",
        "position: 'sticky', top: '20px', zIndex: 50, paddingTop: '80px', paddingBottom: '20px'",
        nav_code
    )
    
    content = content[:nav_start] + content[nav_end:]
    
    hero_start = content.rfind('      {/* 2. Hero Section', 0, len(content))
    if hero_start != -1:
        content = content[:hero_start] + nav_code + "\n" + content[hero_start:]
        
        with open('c:/Users/Pavan/feed/src/components/Home.jsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print("Hero section not found")
else:
    print("Nav bounds not found")
