import os

pages_data = [
    {
        'css': 'app/babak1/page1/babak1.css',
        'css_prefix': 'babak1'
    },
    {
        'css': 'app/babak2/page1/babak2.css',
        'css_prefix': 'babak2'
    },
    {
        'css': 'app/babak4/page1/babak4.css',
        'css_prefix': 'babak4'
    },
    {
        'css': 'app/babak5/page1/babak5.css',
        'css_prefix': 'babak5'
    },
    {
        'css': 'app/babak7/page1/page1.css',
        'css_prefix': 'babak7-page1'
    },
    {
        'css': 'app/babak7/page6/page6.css',
        'css_prefix': 'babak7-page6'
    },
    {
        'css': 'app/babak9/page1/page1.css',
        'css_prefix': 'babak9-page1'
    }
]

for p in pages_data:
    css_path = p['css']
    prefix = p['css_prefix']
    
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace the 3 buttons for all breakpoints
        content = content.replace(f'.{prefix}-opt-luwih_tuwa', f'.{prefix}-opt-Cedhak, .{prefix}-opt-Dhuwur, .{prefix}-opt-Tuwa')
        content = content.replace(f'.{prefix}-opt-sapantaran', f'.{prefix}-opt-Sedheng, .{prefix}-opt-Remaja')
        content = content.replace(f'.{prefix}-opt-luwih_enom', f'.{prefix}-opt-Adoh, .{prefix}-opt-Asor, .{prefix}-opt-Bocah')
        
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {css_path}")
    else:
        print(f"Not found: {css_path}")

