from pathlib import Path
import struct
import zlib

p = Path(__file__).resolve().parent.parent / 'img' / 'blogs'
p.mkdir(parents=True, exist_ok=True)

def png_bytes(w, h, r, g, b):
    raw = b''.join(b'\x00' + bytes((r, g, b)) * w for _ in range(h))

    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', zlib.compress(raw)) + chunk(b'IEND', b'')

files = [
    ('tevrocsdk-hero.png', (44, 47, 58)),
    ('tevrocsdk-authentication.png', (37, 40, 52)),
    ('tevrocsdk-entities.png', (48, 51, 63)),
    ('tevrocsdk-integrations.png', (34, 38, 49)),
]

for name, color in files:
    path = p / name
    path.write_bytes(png_bytes(1200, 675, *color))
    print('wrote', path)
