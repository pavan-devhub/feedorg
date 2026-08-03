import re

with open('c:/Users/Pavan/feed/src/components/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the Top Header Bar
header_start = content.find('      {/* 1. Top Header Bar */}')
header_end = content.find('      {/* 2. Hero Section */}')

if header_start != -1 and header_end != -1:
    header_code = content[header_start:header_end]
    
    # Remove from original location
    content = content[:header_start] + content[header_end:]
    
    # Update styles to attach to bottom
    header_code = header_code.replace(
        "position: 'absolute', width: '100%', zIndex: 20",
        "position: 'absolute', bottom: '10px', left: 0, right: 0, width: '100%', zIndex: 20"
    )
    
    # Remove the translateY(-20px) which we added earlier because it might mess up bottom alignment
    header_code = header_code.replace("transform: 'translateY(-20px)'", "")
    
    # Find the end of Hero Section where we want to insert
    # Hero section has:
    #       {/* Right Bottom Badge */}
    #       <div ...>...</div>
    #
    #     </div>
    badge_str = '{/* Right Bottom Badge */}'
    badge_start = content.find(badge_str)
    
    if badge_start != -1:
        # find the end of the badge div (which is followed by the end of hero section div)
        hero_end = content.find('      {/* 4. Video Section */}', badge_start)
        
        # We need to insert just before the closing </div> of the hero section.
        # It's better to just search backwards from hero_end for a </div>
        insert_pos = content.rfind('</div>', 0, hero_end)
        
        content = content[:insert_pos] + '\n' + header_code + '\n      ' + content[insert_pos:]
        
        with open('c:/Users/Pavan/feed/src/components/Home.jsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print("Badge not found")
else:
    print("Top Header Bar or Hero Section not found")
