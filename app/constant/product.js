import {
  ActivityImage,
  FamilyPlusThumb,
  ParentwithKindi,
  ProductImage,
  PromotionalImage,
  ThemeDummy,
} from "@/public/Images";

const ImageArray = [
  ActivityImage,
  FamilyPlusThumb,
  FamilyPlusThumb,
  ThemeDummy,
  ParentwithKindi,
  PromotionalImage,
  PromotionalImage,
];

const Description = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet
      sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum.
      Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
      consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.
      Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet
      consectetur.
    </div>
  );
};

export const productData = [
  {
    id: 1,
    image: ProductImage,
    title: "Wooden Puzzle Deluxe",
    metaDesc: <Description />,
    rating: "4.5",
    ProductImages: <ImageArray />,
    price: " 43",
  },
  {
    id: 2,
    image: ActivityImage,
    title: "Brain Teaser Challenge",
    metaDesc: <Description />,
    rating: "3.8",
    ProductImages: <ImageArray />,
    price: " 91",
  },
  {
    id: 3,
    image: FamilyPlusThumb,
    title: "Kids' Learning Kit",
    metaDesc: <Description />,
    rating: "4.2",
    ProductImages: <ImageArray />,
    price: " 27",
  },
  {
    id: 4,
    image: ActivityImage,
    title: "3D Puzzle Adventure",
    metaDesc: <Description />,
    rating: "4.8",
    ProductImages: <ImageArray />,
    price: " 63",
  },
  {
    id: 5,
    image: ParentwithKindi,
    title: "Logic Game Master",
    metaDesc: <Description />,
    rating: "4.1",
    ProductImages: <ImageArray />,
    price: " 55",
  },
  {
    id: 6,
    image: ActivityImage,
    title: "Jigsaw Puzzle Pro",
    metaDesc: <Description />,
    rating: "4.6",
    ProductImages: <ImageArray />,
    price: " 39",
  },
  {
    id: 7,
    image: ProductImage,
    title: "Wooden Block Set",
    metaDesc: <Description />,
    rating: "4.3",
    ProductImages: <ImageArray />,
    price: " 49",
  },
  {
    id: 8,
    image: ActivityImage,
    title: "Problem-Solving Pack",
    metaDesc: <Description />,
    rating: "4.9",
    ProductImages: <ImageArray />,
    price: " 79",
  },
  {
    id: 9,
    image: ProductImage,
    title: "Intellectual Toy Box",
    metaDesc: <Description />,
    rating: "4.4",
    ProductImages: <ImageArray />,
    price: " 59",
  },
];
