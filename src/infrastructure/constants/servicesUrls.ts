/**
 * Object containing URLs for various services used in the application.
 */
export const servicesUrls = {
  /**
   * URL for the Spline design service.
   * @type {string}
   */
  spline: process.env.SPLINE_URL || "",

  /**
   * URL for the Cloudinary image service.
   * @type {string}
   */
  cloudinary: process.env.CLOUDINARY_URL || "",

  /**
   * URL for the Cloudinary video service.
   * @type {string}
   */
  cloudinaryVideo: process.env.CLOUDINARY_VIDEO_URL || "",

  /**
   * URL for the GitHub repository.
   * @type {string}
   */
  github: process.env.GITHUB_URL || "",

  /**
   * URL for the LinkedIn profile.
   * @type {string}
   */
  linkedin: process.env.LINKEDIN_URL || "",

  /**
   * URL for the Instagram profile.
   * @type {string}
   */
  instagram: process.env.INSTAGRAM_URL || "",

  /**
   * URL for the Behance profile.
   * @type {string}
   */
  behance: process.env.BEHANCE_URL || "",

  /**
   * URL for downloading the CV.
   * @type {string}
   */
  cvDownload: process.env.CV_DOWNLOAD_URL || "",
};
