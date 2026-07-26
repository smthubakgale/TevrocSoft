import re
from pathlib import Path

base_url = 'https://tevrocsoft.co.za'
pages = [
    {'path': 'index.html', 'title': 'Custom Software Development Company South Africa | TevrocSoft', 'desc': 'TevrocSoft develops custom software, AI solutions, web applications, mobile apps and business automation for businesses across South Africa.', 'keywords': 'software development, custom software, AI development, web development, mobile apps, South Africa', 'url': f'{base_url}/'},
    {'path': 'about.html', 'title': 'About TevrocSoft | Custom Software Development South Africa', 'desc': 'Learn about TevrocSoft and the digital services we build for South African businesses.', 'keywords': 'about TevrocSoft, software development agency, digital services, South Africa', 'url': f'{base_url}/about.html'},
    {'path': 'services.html', 'title': 'Software Development Services | TevrocSoft', 'desc': 'Explore TevrocSoft’s custom software, web app, mobile app, automation and AI development services.', 'keywords': 'software services, custom software, mobile app development, web development, AI development', 'url': f'{base_url}/services.html'},
    {'path': 'pricing.html', 'title': 'Software Development Pricing | TevrocSoft', 'desc': 'View transparent pricing for custom software development, websites, mobile apps and enterprise software solutions.', 'keywords': 'software pricing, web development pricing, app development pricing, custom software cost', 'url': f'{base_url}/pricing.html'},
    {'path': 'contact.html', 'title': 'Contact TevrocSoft | Software Development Company South Africa', 'desc': 'Contact TevrocSoft to discuss your next custom software, web or mobile app project.', 'keywords': 'contact TevrocSoft, software enquiry, custom software quote, web project contact', 'url': f'{base_url}/contact.html'},
    {'path': 'blogs.html', 'title': 'Software Development Blog | TevrocSoft', 'desc': 'Read TevrocSoft’s insights on software development, UX, web platforms and digital product strategy.', 'keywords': 'software blog, digital product insights, web development blog, AI blog', 'url': f'{base_url}/blogs.html'},
    {'path': 'news.html', 'title': 'News & Updates | TevrocSoft', 'desc': 'Stay informed with TevrocSoft news, product launches and company updates.', 'keywords': 'TevrocSoft news, company updates, product launch, digital agency news', 'url': f'{base_url}/news.html'},
    {'path': 'portfolios.html', 'title': 'Portfolio | TevrocSoft', 'desc': 'Explore TevrocSoft projects and delivered digital products for businesses and teams.', 'keywords': 'project portfolio, software projects, web app portfolio, mobile app portfolio', 'url': f'{base_url}/portfolios.html'},
    {'path': 'appointment.html', 'title': 'Project Inquiry | TevrocSoft', 'desc': 'Share your software project goals and timeline with TevrocSoft to get started.', 'keywords': 'project inquiry, software project request, custom development inquiry, contact', 'url': f'{base_url}/appointment.html'},
    {'path': 'faqs.html', 'title': 'FAQs | TevrocSoft', 'desc': 'Find answers to questions about TevrocSoft services, delivery, support and working together.', 'keywords': 'software FAQ, TevrocSoft questions, development process FAQ, project delivery FAQ', 'url': f'{base_url}/faqs.html'},
    {'path': 'timetable.html', 'title': 'Delivery Timeline | TevrocSoft', 'desc': 'Learn TevrocSoft’s typical project delivery timeline for web, mobile and custom software builds.', 'keywords': 'project timeline, delivery timeline, software delivery schedule, development timeline', 'url': f'{base_url}/timetable.html'},
    {'path': 'cookies.html', 'title': 'Cookie Policy | TevrocSoft', 'desc': 'Read TevrocSoft’s cookie policy for site analytics, performance, and user tracking.', 'keywords': 'cookie policy, privacy, tracking cookies, analytics cookies', 'url': f'{base_url}/cookies.html'},
    {'path': 'privacy.html', 'title': 'Privacy Policy | TevrocSoft', 'desc': 'Read TevrocSoft’s privacy policy covering data collection, cookies and user rights.', 'keywords': 'privacy policy, data protection, privacy statement, TevrocSoft privacy', 'url': f'{base_url}/privacy.html'},
    {'path': 'refund.html', 'title': 'Refund Policy | TevrocSoft', 'desc': 'Review TevrocSoft’s refund policy for digital services and software work.', 'keywords': 'refund policy, service refund, project refund, digital services refund', 'url': f'{base_url}/refund.html'},
    {'path': 'terms.html', 'title': 'Terms of Service | TevrocSoft', 'desc': 'Read TevrocSoft’s terms of service for custom software, digital products and website projects.', 'keywords': 'terms of service, service agreement, software development terms', 'url': f'{base_url}/terms.html'},
]

for page in pages:
    path = Path(page['path'])
    if not path.exists():
        print(f'Missing file: {path}')
        continue
    text = path.read_text(encoding='utf-8')
    head_match = re.search(r'(?is)(<head>)(.*?)(</head>)', text)
    if not head_match:
        print(f'Head not found: {path}')
        continue
    head_open, head_content, head_close = head_match.groups()
    head_cleaned = re.sub(r'(?is)<meta[^>]*(?:\bname\s*=\s*["\]?\s*(?:description|keywords|robots|author|developer|twitter:[^"\s>]*)["\]?|property\s*=\s*["\]?\s*og:[^"\s>]*["\]?)[^>]*>\s*', '', head_content)
    head_cleaned = re.sub(r'(?is)<link[^>]*rel\s*=\s*["\]?canonical["\]?[^>]*>\s*', '', head_cleaned)
    head_cleaned = re.sub(r'(?is)<meta[^>]*property\s*=\s*["\]?og:[^"\s>]*["\]?[^>]*>\s*', '', head_cleaned)
    head_cleaned = re.sub(r'(?is)<meta[^>]*name\s*=\s*["\]?twitter:[^"\s>]*["\]?[^>]*>\s*', '', head_cleaned)
    head_cleaned = re.sub(r'(?is)<title>.*?</title>', f'<title>{page["title"]}</title>', head_cleaned)
    meta = (
        f'    <meta name="description" content="{page["desc"]}">\n'
        f'    <meta name="keywords" content="{page["keywords"]}">\n'
        f'    <meta name="robots" content="index,follow">\n'
        f'    <link rel="canonical" href="{page["url"]}">\n'
        f'    <meta property="og:type" content="website">\n'
        f'    <meta property="og:title" content="{page["title"]}">\n'
        f'    <meta property="og:description" content="{page["desc"]}">\n'
        f'    <meta property="og:url" content="{page["url"]}">\n'
        f'    <meta property="og:image" content="https://tevrocsoft.co.za/img/logo.svg">\n'
        f'    <meta name="twitter:card" content="summary_large_image">\n'
        f'    <meta name="twitter:title" content="{page["title"]}">\n'
        f'    <meta name="twitter:description" content="{page["desc"]}">\n'
        f'    <meta name="twitter:image" content="https://tevrocsoft.co.za/img/logo.svg">\n'
    )
    head_content_new = re.sub(r'(?is)(<title>.*?</title>)', r'\1\n' + meta, head_cleaned, count=1)
    new_text = text[:head_match.start(2)] + head_content_new + text[head_match.end(2):]
    path.write_text(new_text, encoding='utf-8')
    print(f'Updated {path}')
