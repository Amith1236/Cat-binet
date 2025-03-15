import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\amith\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

# Test image
image_path = "TestImage.png"  # Replace with an actual medicine label image

text = pytesseract.image_to_string(Image.open(image_path))
print("Detected Text:\n", text)
