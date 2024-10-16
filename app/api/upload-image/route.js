export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }
  
    const { fileUpload } = req.files; // Adjust based on your backend configuration
  
    try {
      // Example code to upload file to Hygraph or another storage service
      // const imageUrl = await uploadToHygraph(fileUpload);
      const imageUrl = "https://example.com/your-uploaded-image-url.jpg";
  
      return res.status(200).json({ url: imageUrl });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Image upload failed" });
    }
  }
  