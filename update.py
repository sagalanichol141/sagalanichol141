import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make the warning box green
css = re.sub(r'--danger:.+?;', '--danger: rgba(46, 204, 113, 0.1);', css)
css = re.sub(r'--danger-border:.+?;', '--danger-border: rgba(46, 204, 113, 0.4);', css)
# If the warning-title color is #ff7777, make it green
css = css.replace('color: #ff7777;', 'color: #2ecc71;')
css = css.replace('color: #ffc107;', 'color: #2ecc71;')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'<div class="warning-title">[\s\S]*?</div>', r'<div class="warning-title">Google Play Store Release</div>', html)
html = re.sub(r'<div class="info-title">[\s\S]*?</div>', r'<div class="warning-title">Google Play Store Release</div>', html)
html = re.sub(r'<p>\s*Originally published on Google Play[\s\S]*?</p>', '', html)
html = re.sub(r'<p>\s*This game was proudly published[\s\S]*?</p>', '', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
