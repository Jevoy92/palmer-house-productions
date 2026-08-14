from pathlib import Path
from io import BytesIO
from PIL import Image, ImageDraw
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white, black
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import Font
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).parent
ASSETS = ROOT / "assets"
OUT = ROOT / "output" / "pdf" / "Holo_Brand_Design_Guide.pdf"
TMP = ROOT / "tmp" / "pdfs"
TMP.mkdir(parents=True, exist_ok=True)

W, H = 960, 540
INK = HexColor("#1D1D1F")
MUTED = HexColor("#6E6E73")
PAPER = HexColor("#FBFBFB")
LINE = HexColor("#E6E6E7")
PINK = HexColor("#EC4492")
ORANGE = HexColor("#F05427")
YELLOW = HexColor("#FEDF6F")
BLUE = HexColor("#3E86C6")
PURPLE = HexColor("#A666AA")
GREEN = HexColor("#54D154")

SCREEN_PAGES = [
    ("Homepage", "home.png", "tryholo.ai/", "Master system: promise, proof, product story, mascot, and social validation."),
    ("Pricing", "pricing.png", "tryholo.ai/pricing", "Conversion system: plan framing, reassurance, comparison, and repeated action."),
    ("About", "about.png", "tryholo.ai/about-us", "Culture system: team, origin story, personality, and trust."),
    ("Affiliate", "affiliate.png", "tryholo.ai/affiliate", "Partner system: incentive, mechanics, proof, and application flow."),
    ("Blog", "blog.png", "tryholo.ai/blog", "Editorial system: taxonomy, cards, thumbnails, and browsing hierarchy."),
    ("Ad Generator", "ad-generator.png", "tryholo.ai/ad-generator", "Product landing system: outcome-led education and creative demonstrations."),
    ("Newsletter Generator", "newsletter-generator.png", "tryholo.ai/ai-newsletter-generator", "Channel-specific story using the shared Holo conversion grammar."),
    ("UGC Generator", "ugc-generator.png", "tryholo.ai/ai-ugc-generator", "Creator-led visual language, social proof, and workflow education."),
    ("Facebook Ads Maker", "facebook-ads.png", "tryholo.ai/facebook-ads-maker", "Platform-specific adaptation with recognizable examples and proof."),
    ("Influencer Generator", "influencer-generator.png", "tryholo.ai/influencer-generator", "Character-led imagery and repeatable benefit sections."),
    ("Instagram Ads Maker", "instagram-ads.png", "tryholo.ai/instagram-ads-maker", "Social-first creative examples inside the shared design system."),
    ("TikTok Video Generator", "tiktok-video.png", "tryholo.ai/tiktok-video-generator", "Motion-oriented storytelling, creator imagery, and platform proof."),
]

APP_SCREEN_PAGES = [
    ("Dashboard", "01-dashboard.png", "/dashboard", "Workspace overview: progress, shortcuts, recommendations, and a persistent navigation rail."),
    ("Chat", "02-chat.png", "/dashboard/chat", "Assistant workspace: minimal prompt-first composition with conversation history held in a secondary rail."),
    ("Library", "03-library.png", "/dashboard/boards", "Visual asset management: soft spectral header, collection chips, filters, and an open gallery canvas."),
    ("Brand DNA", "04-brand-dna.png", "/dashboard/brand/dna", "Brand setup hub: a memorable three-part model for services, moodboard, and context."),
    ("Inspiration", "05-inspo.png", "/dashboard/inspo", "Creative discovery surface for collecting references and turning inspiration into action."),
    ("Calendar", "06-calendar.png", "/dashboard/calendar", "Publishing planner: time-based structure layered into the same light, rounded workspace shell."),
    ("Inbox", "07-inbox.png", "/dashboard/inbox", "Social response hub: connection state, message organization, and channel-oriented actions."),
    ("Analytics", "08-analytics.png", "/dashboard/social-analytics", "Performance dashboard: metrics and charts framed as approachable decision-support tools."),
    ("Create menu", "09-create-menu.png", "Create overlay", "Generative launch point: creation modes grouped in a compact, high-contrast action layer."),
    ("Playground", "10-playground.png", "Playground overlay", "Experimental tool browser: model and format choices presented as tactile cards."),
    ("Idea Swipe settings", "11-idea-swipe-settings.png", "/dashboard/images/content-swipe/settings", "Guided ad workflow: progressive settings reduce a complex creative brief into manageable choices."),
    ("Concept selection", "12-concept-product-select.png", "/dashboard/images/concept/select-product", "Concept workflow: visual product selection makes the next step concrete and low-friction."),
    ("Account popover", "13-account-popover.png", "Bottom-left account menu", "Compact account switcher: settings, support, help, and recent workspaces stay one click from the global rail."),
    ("Workspace settings", "14-settings-workspace.png", "Settings · Workspace", "Workspace profile and activity are organized inside a focused modal layered over the current task."),
    ("Brand settings", "15-settings-brands.png", "Settings · Brands", "Brand management uses the same left-tab modal shell to keep organizational controls predictable."),
    ("Team settings", "16-settings-team.png", "Settings · Team", "Collaboration controls: membership and invitations are contained without leaving the active workspace."),
    ("Integration settings", "17-settings-integrations.png", "Settings · Integrations", "Channel connections become a scannable service list with consistent icon, label, and action alignment."),
    ("Credit settings", "18-settings-credits.png", "Settings · Credits", "Usage and plan options are made legible through a meter, tier cards, and restrained comparison details."),
    ("Account settings", "19-settings-account.png", "Settings · Account", "Subscription and payment controls share the modal system while preserving a strong information hierarchy."),
]


def prepare_font():
    # ReportLab cannot embed WOFF2 directly; Helvetica is the closest bundled
    # production-safe fallback while the guide still documents Satoshi itself.
    pdfmetrics.registerFont(Font("Satoshi", "Helvetica", "WinAnsiEncoding"))


prepare_font()


def rounded(c, x, y, w, h, r=16, fill=PAPER, stroke=None, sw=1):
    c.setLineWidth(sw)
    c.setFillColor(fill)
    c.setStrokeColor(stroke or fill)
    c.roundRect(x, y, w, h, r, fill=1, stroke=1 if stroke else 0)


def txt(c, s, x, y, size=16, color=INK, font="Satoshi", maxw=None, leading=None, align="left"):
    c.setFont(font, size)
    c.setFillColor(color)
    leading = leading or size * 1.18
    lines = []
    for raw in s.split("\n"):
        if maxw is None:
            lines.append(raw)
            continue
        words, line = raw.split(), ""
        for word in words:
            test = f"{line} {word}".strip()
            if c.stringWidth(test, font, size) <= maxw or not line:
                line = test
            else:
                lines.append(line)
                line = word
        lines.append(line)
    for i, line in enumerate(lines):
        yy = y - i * leading
        if align == "center":
            c.drawCentredString(x, yy, line)
        elif align == "right":
            c.drawRightString(x, yy, line)
        else:
            c.drawString(x, yy, line)
    return y - len(lines) * leading


def label(c, s, x, y, color=PINK):
    c.setFont("Satoshi", 9)
    width = c.stringWidth(s.upper(), "Satoshi", 9) + 20
    rounded(c, x, y - 5, width, 21, 10, Color(color.red, color.green, color.blue, .10))
    c.setFillColor(color)
    c.drawString(x + 10, y + 2, s.upper())


def title(c, kicker, heading, sub=None):
    label(c, kicker, 54, H - 55)
    txt(c, heading, 54, H - 100, 34, INK, maxw=850, leading=38)
    if sub:
        txt(c, sub, 54, H - 148, 14, MUTED, maxw=820, leading=18)


def footer(c, n):
    c.setStrokeColor(LINE)
    c.line(54, 29, W - 54, 29)
    txt(c, "HOLO · BRAND DESIGN GUIDE", 54, 13, 8, MUTED)
    txt(c, f"{n:02d}", W - 54, 13, 8, MUTED, align="right")


def pill(c, s, x, y, fill=PAPER, color=INK, stroke=LINE):
    c.setFont("Satoshi", 10)
    w = c.stringWidth(s, "Satoshi", 10) + 26
    rounded(c, x, y, w, 28, 14, fill, stroke)
    txt(c, s, x + 13, y + 9, 10, color)
    return w


def image_fit(c, path, x, y, w, h, radius=0, crop=True):
    im = Image.open(path).convert("RGB")
    ratio = max(w / im.width, h / im.height) if crop else min(w / im.width, h / im.height)
    nw, nh = int(im.width * ratio), int(im.height * ratio)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    if crop:
        left, top = (nw - int(w)) // 2, (nh - int(h)) // 2
        im = im.crop((left, top, left + int(w), top + int(h)))
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, im.width, im.height), radius=radius, fill=255)
    rgba = im.convert("RGBA")
    rgba.putalpha(mask)
    buf = BytesIO(); rgba.save(buf, "PNG"); buf.seek(0)
    c.drawImage(ImageReader(buf), x, y, w, h, mask='auto')


def page_bg(c, color=PAPER):
    c.setFillColor(color); c.rect(0, 0, W, H, fill=1, stroke=0)


def page_cover(c):
    page_bg(c, PAPER)
    # soft spectral glow
    for i, col in enumerate([PINK, ORANGE, YELLOW, GREEN, BLUE, PURPLE]):
        c.setFillColor(Color(col.red, col.green, col.blue, .12))
        c.circle(760 + (i % 2) * 35, 360 - i * 25, 165 - i * 12, fill=1, stroke=0)
    c.drawImage(str(ASSETS / "holo-logo.png"), 64, 430, 44, 44, mask='auto')
    txt(c, "BRAND DESIGN GUIDE", 64, 382, 11, PINK)
    txt(c, "Holo", 64, 310, 62, INK)
    txt(c, "Marketing that feels\nfast, friendly, and alive.", 64, 250, 30, INK, leading=34)
    txt(c, "An independent visual-system study derived from tryholo.ai · August 2026", 64, 94, 12, MUTED)
    pill(c, "Observed system", 64, 48, white, PINK, PINK)
    pill(c, "Practical guidance", 205, 48, white, BLUE, BLUE)


def page_essence(c):
    page_bg(c); title(c, "01 · Foundation", "Brand essence", "Holo makes high-volume marketing feel approachable, capable, and a little playful.")
    cards = [
        ("PROMISE", "Launch more.\nMove faster.", PINK),
        ("PERSONALITY", "Smart without\nbeing stiff.", BLUE),
        ("EXPERIENCE", "Simple inputs.\nVisible momentum.", ORANGE),
    ]
    for i, (k, v, col) in enumerate(cards):
        x = 54 + i * 290
        rounded(c, x, 188, 260, 180, 22, white, LINE)
        c.setFillColor(col); c.circle(x + 34, 330, 8, fill=1, stroke=0)
        txt(c, k, x + 52, 326, 9, MUTED)
        txt(c, v, x + 26, 274, 23, INK, leading=28)
        txt(c, ["Performance-led", "Founder-friendly", "Creative confidence"][i], x + 26, 214, 11, col)
    txt(c, "Core idea", 54, 143, 11, PINK)
    txt(c, "A marketing co-pilot that turns one URL into an always-on creative engine.", 54, 111, 20, INK, maxw=825)
    footer(c, 2)


def page_logo(c):
    page_bg(c); title(c, "02 · Identity", "Logo and mascot", "The compact Holo icon behaves like a friendly product companion, not a corporate seal.")
    rounded(c, 54, 175, 400, 210, 24, white, LINE)
    c.drawImage(str(ASSETS / "holo-logo.png"), 170, 225, 168, 168, mask='auto')
    rounded(c, 486, 175, 420, 210, 24, INK)
    rounded(c, 607, 218, 178, 178, 89, white)
    c.drawImage(str(ASSETS / "holo-logo.png"), 612, 223, 168, 168, mask='auto')
    txt(c, "Preferred: icon on light", 54, 146, 12, INK)
    txt(c, "Dark context: retain a white tile; never recolor the face", 486, 146, 12, INK, maxw=405)
    txt(c, "Usage principles", 54, 102, 12, PINK)
    x = 54
    for s in ["Keep generous clear space", "Use as a helper/guide", "Never flatten the glow", "Avoid facial alterations"]:
        x += pill(c, s, x, 56, white, INK, LINE) + 10
    footer(c, 3)


def page_color(c):
    page_bg(c); title(c, "03 · Identity", "Color system", "A neutral product foundation with small, high-energy spectral accents.")
    colors = [
        ("Ink", "#1D1D1F", INK, white), ("Paper", "#FBFBFB", PAPER, INK),
        ("Pink", "#EC4492", PINK, white), ("Orange", "#F05427", ORANGE, white),
        ("Sun", "#FEDF6F", YELLOW, INK), ("Blue", "#3E86C6", BLUE, white),
        ("Purple", "#A666AA", PURPLE, white), ("Green", "#54D154", GREEN, INK),
    ]
    for i, (name, hx, col, tc) in enumerate(colors):
        x = 54 + (i % 4) * 216; y = 264 - (i // 4) * 134
        rounded(c, x, y, 196, 116, 18, col)
        txt(c, name, x + 16, y + 34, 13, tc)
        txt(c, hx, x + 16, y + 15, 10, tc)
    txt(c, "Recommended ratio", 54, 105, 11, PINK)
    c.setFillColor(INK); c.rect(54, 58, 430, 25, fill=1, stroke=0)
    c.setFillColor(white); c.rect(484, 58, 330, 25, fill=1, stroke=0)
    c.setFillColor(PINK); c.rect(814, 58, 32, 25, fill=1, stroke=0)
    c.setFillColor(ORANGE); c.rect(846, 58, 32, 25, fill=1, stroke=0)
    c.setFillColor(BLUE); c.rect(878, 58, 28, 25, fill=1, stroke=0)
    txt(c, "50% ink · 38% paper · 12% accents", 54, 42, 10, MUTED)
    footer(c, 4)


def page_type(c):
    page_bg(c); title(c, "04 · Identity", "Typography", "Satoshi is the observed workhorse: geometric, contemporary, and warm enough for a playful product.")
    txt(c, "Satoshi Variable", 54, 356, 13, PINK)
    txt(c, "Launch 10x more\ncontent. 75% faster.", 54, 300, 39, INK, leading=43)
    rounded(c, 590, 182, 316, 206, 20, white, LINE)
    txt(c, "TYPE SCALE", 618, 352, 9, MUTED)
    specs = [("Display", "48–72", 28), ("Heading", "28–40", 21), ("Subhead", "18–24", 16), ("Body", "14–18", 12), ("Label", "10–12", 9)]
    yy = 315
    for name, size, pt in specs:
        txt(c, name, 618, yy, pt, INK)
        txt(c, size + " px", 874, yy, 10, MUTED, align="right"); yy -= 38
    txt(c, "Voice in type", 54, 141, 11, PINK)
    txt(c, "Use tight display leading, compact sentence case, and bold emphasis only where it sharpens the claim.", 54, 111, 16, INK, maxw=820)
    txt(c, "Observed secondary face: Wonderkids Regular — reserve for rare playful accents, never body copy.", 54, 70, 11, MUTED)
    footer(c, 5)


def page_layout(c):
    page_bg(c); title(c, "05 · System", "Layout and composition", "The site pairs generous white space with compact product proof and off-center visual moments.")
    # wireframes
    for i in range(3):
        x = 54 + i * 290
        rounded(c, x, 158, 260, 226, 18, white, LINE)
        c.setFillColor(INK); c.roundRect(x+20, 342, 115+(i*18), 12, 6, fill=1, stroke=0)
        c.setFillColor(LINE); c.roundRect(x+20, 319, 180, 7, 3, fill=1, stroke=0)
        if i == 0:
            rounded(c, x+20, 190, 220, 100, 14, Color(PINK.red,PINK.green,PINK.blue,.12))
        elif i == 1:
            rounded(c, x+132, 190, 108, 100, 14, Color(BLUE.red,BLUE.green,BLUE.blue,.12))
            txt(c, "01", x+20, 277, 30, INK)
        else:
            for j in range(4): rounded(c, x+20+j*55, 210+(j%2)*32, 45, 70, 10, [PINK,ORANGE,YELLOW,BLUE][j])
    labels = ["Center the promise", "Alternate text + product", "Show creative abundance"]
    for i, s in enumerate(labels): txt(c, s, 54+i*290, 131, 12, INK)
    txt(c, "Composition rules", 54, 94, 11, PINK)
    x=54
    for s in ["12-column grid", "24–32 px radii", "Large breathing room", "Asymmetric accents"]:
        x += pill(c, s, x, 54, white, INK, LINE) + 10
    footer(c, 6)


def page_image(c):
    page_bg(c); title(c, "06 · System", "Imagery and motion", "Demonstrate the output: bold product frames, generated creative, and a mascot that makes AI feel human.")
    image_fit(c, ASSETS / "hero.webp", 54, 145, 518, 232, 22)
    rounded(c, 598, 145, 308, 232, 22, white, LINE)
    c.drawImage(str(ASSETS / "holo-logo.png"), 690, 205, 124, 124, mask='auto')
    txt(c, "CREATIVE OUTPUT", 54, 123, 9, PINK)
    txt(c, "Full-bleed, colorful, tangible", 54, 101, 14, INK)
    txt(c, "MASCOT", 598, 123, 9, BLUE)
    txt(c, "Helpful, curious, lightly mischievous", 598, 101, 14, INK)
    txt(c, "Motion should clarify a workflow, reveal abundance, or add personality — never delay the next action.", 54, 62, 14, MUTED, maxw=850)
    footer(c, 7)


def page_voice(c):
    page_bg(c); title(c, "07 · Expression", "Voice and messaging", "Direct claims create momentum; conversational asides keep the brand human.")
    left = [
        ("Lead with the outcome", "Launch 10x more content. 75% faster."),
        ("Make the task feel easy", "Drop your website link."),
        ("Add one human aside", "You rest. Holo doesn't."),
    ]
    for i,(k,v) in enumerate(left):
        y=330-i*92
        txt(c, f"0{i+1}", 54, y, 12, PINK)
        txt(c, k, 92, y, 12, MUTED)
        txt(c, v, 92, y-31, 20, INK)
    rounded(c, 572, 151, 334, 240, 22, white, LINE)
    txt(c, "DO", 598, 354, 10, GREEN)
    txt(c, "Short. Specific. Active.\nConfident, not breathless.\nPlayful after the proof.", 598, 325, 17, INK, leading=29)
    txt(c, "AVOID", 598, 230, 10, ORANGE)
    txt(c, "AI jargon\nVague superlatives\nLong setup before value", 598, 202, 13, MUTED, leading=19)
    txt(c, "Message formula", 54, 93, 11, PINK)
    txt(c, "Outcome → mechanism → proof → low-friction action", 54, 63, 21, INK)
    footer(c, 8)


def page_ui(c):
    page_bg(c); title(c, "08 · Application", "UI and campaign toolkit", "Use soft containers, thin borders, spectral micro-accents, and unmistakable calls to action.")
    rounded(c, 54, 150, 510, 224, 22, white, LINE)
    txt(c, "Create your next campaign", 82, 351, 20, INK)
    txt(c, "Paste your website and let Holo learn the brand.", 82, 322, 12, MUTED)
    rounded(c, 82, 267, 454, 42, 12, PAPER, LINE)
    txt(c, "https://yourbrand.com", 98, 282, 12, MUTED)
    rounded(c, 82, 209, 156, 42, 21, PINK)
    txt(c, "Generate ideas", 112, 225, 12, white)
    pill(c, "No prompts needed", 252, 216, white, BLUE, LINE)
    rounded(c, 594, 150, 312, 224, 22, INK)
    txt(c, "COMPONENT RULES", 622, 353, 9, YELLOW)
    rules=["Primary CTA: pink + white", "Cards: 16–24 px radius", "Borders: #E6E6E7", "Accent use: < 15%", "Microcopy: reassuring"]
    yy=319
    for r in rules:
        c.setFillColor(PINK); c.circle(625,yy+3,3,fill=1,stroke=0)
        txt(c,r,640,yy,13,white); yy-=34
    txt(c, "Campaign pattern", 54, 119, 11, PINK)
    txt(c, "One bold promise · one product proof · one friendly nudge · one clear action", 54, 87, 18, INK)
    footer(c, 9)


def page_guardrails(c):
    page_bg(c); title(c, "09 · Governance", "Consistency guardrails", "Use this page as the final check before publishing a Holo-branded experience.")
    cols=[("KEEP",GREEN,["Outcome appears first","Ink + paper dominate","Satoshi carries hierarchy","Mascot supports the story","CTA is immediately visible"]),
          ("AVOID",ORANGE,["Overloading spectral colors","Dense technical language","Generic robot imagery","Tiny type in busy cards","Animation without purpose"])]
    for i,(head,col,items) in enumerate(cols):
        x=54+i*430
        rounded(c,x,151,400,218,22,white,LINE)
        txt(c,head,x+28,362,11,col)
        yy=303
        for it in items:
            c.setFillColor(col); c.circle(x+31,yy+4,5,fill=1,stroke=0)
            txt(c,it,x+50,yy,14,INK); yy-=33
    txt(c, "Five-second test", 54, 113, 11, PINK)
    txt(c, "Does it feel fast? Does it feel easy? Does it still feel made for humans?", 54, 81, 19, INK)
    footer(c, 10)


def page_screen_library(c):
    page_bg(c, INK)
    label(c, "10 · Screen library", 54, H-55, YELLOW)
    txt(c, "The Holo site, screen by screen", 54, H-112, 36, white)
    txt(c, "A Mobbin-style desktop reference set covering every public page that materially contributes to the visual brand.", 54, H-159, 15, HexColor('#C7C7CC'), maxw=820)
    rounded(c,54,145,852,205,22,HexColor('#262629'),HexColor('#3A3A3D'))
    txt(c,"31",82,294,42,YELLOW)
    txt(c,"public + product screens",82,253,13,white)
    txt(c,"~155",330,294,42,PINK)
    txt(c,"sequential viewport captures",330,253,13,white)
    txt(c,"1440",654,294,42,BLUE)
    txt(c,"desktop capture width",654,253,13,white)
    txt(c,"Reading key",82,198,10,YELLOW)
    txt(c,"Panels run top-to-bottom and left-to-right. Each page title includes the source route and its role in the brand system.",82,171,13,HexColor('#C7C7CC'),maxw=770)
    txt(c,"Legal policies, payment-editing flows, and author archives are intentionally excluded because they add no essential visual pattern.",54,92,12,HexColor('#C7C7CC'),maxw=820)
    c.setStrokeColor(HexColor('#3A3A3D')); c.line(54,29,W-54,29)
    txt(c,"HOLO · SCREEN REFERENCE LIBRARY",54,13,8,HexColor('#8E8E93'))


def page_asset_manifest(c, authenticated=False):
    page_bg(c)
    items = APP_SCREEN_PAGES if authenticated else SCREEN_PAGES
    folder = "assets/app-screens/" if authenticated else "assets/screens/"
    label(c, "Screen assets", 54, H-55, GREEN if authenticated else PINK)
    heading = "Authenticated screen files" if authenticated else "Public-site screen files"
    txt(c, heading, 54, H-101, 30, INK)
    txt(c, f"Source folder · holo-brand-guide/{folder}", 54, H-132, 11, BLUE)
    cols = 3 if authenticated else 2
    rows = (len(items) + cols - 1) // cols
    for i, (title_name, filename, route, note) in enumerate(items):
        col, row = i // rows, i % rows
        col_w = 286 if authenticated else 430
        x = 54 + col * col_w
        y = 350 - row * 43
        c.setFillColor(GREEN if authenticated else PINK)
        c.circle(x + 5, y + 7, 3, fill=1, stroke=0)
        title_w = 120 if authenticated else 185
        file_x = 142 if authenticated else 205
        txt(c, title_name, x + 16, y + 4, 11, INK, maxw=title_w)
        txt(c, filename, x + file_x, y + 4, 8 if authenticated else 9, MUTED, maxw=col_w-file_x-8)
        txt(c, route, x + 16, y - 12, 7 if authenticated else 8, BLUE, maxw=col_w-28)
    c.setStrokeColor(LINE); c.line(54,29,W-54,29)
    txt(c,"HOLO · SCREEN ASSET MANIFEST",54,13,8,MUTED)
    txt(c,f"{len(items)} FILES",W-54,13,8,MUTED,align='right')


def screen_slice_reader(im, top, slice_h=1000):
    bottom = min(top + slice_h, im.height)
    crop = im.crop((0, top, im.width, bottom)).convert("RGB")
    if crop.height < slice_h:
        padded = Image.new("RGB", (im.width, slice_h), (251,251,251))
        padded.paste(crop, (0,0)); crop = padded
    buf = BytesIO(); crop.save(buf, "JPEG", quality=82, optimize=True); buf.seek(0)
    return ImageReader(buf)


def screen_reference_pages(c):
    screen_dir = ASSETS / "screens"
    for title_name, filename, route, note in SCREEN_PAGES:
        im = Image.open(screen_dir / filename)
        tops = list(range(0, im.height, 1000))
        total_spreads = (len(tops) + 5) // 6
        for spread in range(total_spreads):
            page_bg(c)
            label(c, "Screen reference", 54, H-55)
            txt(c, title_name, 54, H-101, 30, INK)
            txt(c, route, W-54, H-93, 10, BLUE, align="right")
            txt(c, note, 54, H-132, 11, MUTED, maxw=780)
            txt(c, f"Journey {spread+1} of {total_spreads}", W-54, H-129, 9, MUTED, align="right")
            batch = tops[spread*6:(spread+1)*6]
            for j, top_px in enumerate(batch):
                col, row = j % 3, j // 3
                x, y = 54 + col*290, 215 - row*180
                rounded(c, x, y, 270, 174, 10, white, LINE)
                c.drawImage(screen_slice_reader(im, top_px), x+5, y+18, 260, 151, preserveAspectRatio=True, anchor='c')
                txt(c, f"{(spread*6)+j+1:02d}  ·  {top_px:,} px", x+8, y+6, 8, MUTED)
            c.setStrokeColor(LINE); c.line(54,29,W-54,29)
            txt(c,"HOLO · SCREEN REFERENCE LIBRARY",54,13,8,MUTED)
            txt(c,f"{title_name.upper()} · {spread+1}/{total_spreads}",W-54,13,8,MUTED,align='right')
            c.showPage()


def page_product_library(c):
    page_bg(c, INK)
    label(c, "11 · Product interface", 54, H-55, GREEN)
    txt(c, "Inside the Holo workspace", 54, H-112, 36, white)
    txt(c, "Nineteen authenticated desktop screens documenting the product shell, core tools, creation flows, and workspace settings.", 54, H-159, 15, HexColor('#C7C7CC'), maxw=820)
    rounded(c,54,145,852,205,22,HexColor('#262629'),HexColor('#3A3A3D'))
    txt(c,"19",82,294,42,GREEN)
    txt(c,"authenticated screens",82,253,13,white)
    txt(c,"4",330,294,42,PINK)
    txt(c,"workspace zones",330,253,13,white)
    txt(c,"1",654,294,42,BLUE)
    txt(c,"shared interface shell",654,253,13,white)
    txt(c,"System read",82,198,10,GREEN)
    txt(c,"Navigation stays stable while task-specific canvases, panels, cards, and overlays change inside it. Pastel atmosphere carries brand; white space carries usability.",82,171,13,HexColor('#C7C7CC'),maxw=770)
    txt(c,"Captured with user-authorized account access. Destructive controls and payment-editing flows were not opened.",54,92,12,HexColor('#C7C7CC'),maxw=820)
    c.setStrokeColor(HexColor('#3A3A3D')); c.line(54,29,W-54,29)
    txt(c,"HOLO · AUTHENTICATED PRODUCT ATLAS",54,13,8,HexColor('#8E8E93'))


def app_reference_pages(c):
    screen_dir = ASSETS / "app-screens"
    for index, (title_name, filename, route, note) in enumerate(APP_SCREEN_PAGES, 1):
        page_bg(c)
        label(c, "Authenticated screen", 54, H-55, GREEN)
        txt(c, title_name, 54, H-101, 30, INK)
        txt(c, route, W-54, H-93, 10, BLUE, align="right")
        txt(c, note, 54, H-132, 11, MUTED, maxw=830)
        frame_x, frame_y, frame_w, frame_h = 54, 72, 852, 326
        rounded(c, frame_x, frame_y, frame_w, frame_h, 16, white, LINE)
        im = Image.open(screen_dir / filename)
        scale = min((frame_w-14) / im.width, (frame_h-14) / im.height)
        dw, dh = im.width * scale, im.height * scale
        dx, dy = frame_x + (frame_w-dw)/2, frame_y + (frame_h-dh)/2
        c.drawImage(str(screen_dir / filename), dx, dy, dw, dh, preserveAspectRatio=True, anchor='c')
        c.setStrokeColor(LINE); c.line(54,29,W-54,29)
        txt(c,"HOLO · AUTHENTICATED PRODUCT ATLAS",54,13,8,MUTED)
        txt(c,f"{index:02d} / {len(APP_SCREEN_PAGES):02d}",W-54,13,8,MUTED,align='right')
        c.showPage()


def page_sources(c):
    page_bg(c, INK)
    label(c, "12 · Notes", 54, H-55, YELLOW)
    txt(c, "Method and source note", 54, H-105, 34, white)
    txt(c, "This guide is an independent reverse-engineered brand study, not an official Holo standards manual.", 54, H-151, 16, HexColor('#C7C7CC'), maxw=830)
    rounded(c,54,165,852,198,22,HexColor('#262629'),HexColor('#3A3A3D'))
    txt(c,"OBSERVED DIRECTLY",82,330,10,YELLOW)
    txt(c,"Logo icon · Satoshi and Wonderkids webfonts · repeated site colors · rounded-card UI · mascot usage · headline and CTA patterns",82,300,14,white,maxw=780)
    txt(c,"INTERPRETED FOR USE",82,244,10,PINK)
    txt(c,"Color ratios · spacing recommendations · typography scale · voice formula · governance rules",82,214,14,white,maxw=780)
    txt(c,"Primary source",54,123,10,YELLOW)
    txt(c,"tryholo.ai public site and authenticated product workspace · accessed August 4, 2026 with user authorization",54,96,14,white,maxw=830)
    txt(c,"Brand assets remain the property of their respective owner. Use this guide as a working reference and validate against official files before production.",54,61,11,HexColor('#C7C7CC'),maxw=840)
    c.setStrokeColor(HexColor('#3A3A3D')); c.line(54,29,W-54,29)
    txt(c,"HOLO · BRAND DESIGN GUIDE",54,13,8,HexColor('#8E8E93')); txt(c,"END",W-54,13,8,HexColor('#8E8E93'),align='right')


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(W,H))
    c.setTitle("Holo Brand Design Guide")
    for fn in [page_cover,page_essence,page_logo,page_color,page_type,page_layout,page_image,page_voice,page_ui,page_guardrails,page_screen_library]:
        fn(c); c.showPage()
    page_asset_manifest(c, authenticated=False); c.showPage()
    screen_reference_pages(c)
    page_product_library(c); c.showPage()
    page_asset_manifest(c, authenticated=True); c.showPage()
    app_reference_pages(c)
    page_sources(c); c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
