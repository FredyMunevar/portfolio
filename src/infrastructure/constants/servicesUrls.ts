/**
 * Object containing URLs for various services used in the application.
 */
export const servicesUrls = {
  /**
   * URL for the Spline design service.
   * @type {string}
   */
  spline: process.env.NEXT_PUBLIC_SPLINE_URL || "",

  /**
   * URL for the Cloudinary image service.
   * @type {string}
   */
  cloudinary: process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",

  /**
   * URL for the Cloudinary video service.
   * @type {string}
   */
  cloudinaryVideo: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_URL || "",

  /**
   * URL for the GitHub repository.
   * @type {string}
   */
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",

  /**
   * URL for the LinkedIn profile.
   * @type {string}
   */
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",

  /**
   * URL for the Instagram profile.
   * @type {string}
   */
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",

  /**
   * URL for the Behance profile.
   * @type {string}
   */
  behance: process.env.NEXT_PUBLIC_BEHANCE_URL || "",

  /**
   * URL for downloading the CV.
   * @type {string}
   */
  cvDownload: process.env.NEXT_PUBLIC_CV_DOWNLOAD_URL || "",
  /**
   * URL for the messages service.
   * @type {string}
   */
  api: process.env.NEXT_PUBLIC_API || "",
};
