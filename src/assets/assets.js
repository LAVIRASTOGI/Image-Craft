import logo from "./logo.svg";
import logo_icon from "./logo_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import sample_img_1 from "./sample_img_1.png";
import sample_img_2 from "./sample_img_2.png";
import sample_img_3 from "./sample_img_3.png";
import sample_img_4 from "./sample_img_4.png";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";

export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  sample_img_3,
  sample_img_4,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  razorpay_logo,
  stripe_logo,
};

export const stepsData = [
  {
    title: "Choose Your Tool",
    description:
      "Select from our powerful suite of AI tools: Text-to-Image generation, Background Removal, or Watermark Removal.",
    icon: step_icon_1,
  },
  {
    title: "Create with Ease",
    description:
      "Whether you're a designer, developer, or content creator, our intuitive interface makes professional image editing simple.",
    icon: step_icon_2,
  },
  {
    title: "Elevate Your Projects",
    description:
      "Instantly download high-quality results to use in your designs, applications, or social media content.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Priya Sharma",
    role: "UI/UX Designer",
    stars: 5,
    text: `ImageCraft has revolutionized my design workflow. The background removal tool saves me hours of work, and the results are flawless. Perfect for creating mockups and prototypes quickly.`,
  },
  {
    image: profile_img_2,
    name: "Arjun Patel",
    role: "Full Stack Developer",
    stars: 5,
    text: `As a developer working on multiple projects, ImageCraft helps me create custom graphics without hiring a designer. The text-to-image feature understands exactly what I need for my applications.`,
  },
  {
    image: profile_img_1,
    name: "Neha Verma",
    role: "Content Creator",
    stars: 5,
    text: `I create content for Instagram and YouTube daily, and ImageCraft has been a game-changer. The watermark removal feature is incredible - my thumbnails and posts look professional without any effort.`,
  },
];

export const plans = [
  {
    id: "Basic",
    price: 499,
    credits: 100,
    desc: "Perfect for students and beginners.",
  },
  {
    id: "Professional",
    price: 1999,
    credits: 500,
    desc: "Ideal for freelancers and content creators.",
  },
  {
    id: "Enterprise",
    price: 4999,
    credits: 2000,
    desc: "Best for agencies and businesses.",
  },
];
