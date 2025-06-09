import SimpleText from "@/components/simple-text";
import { client } from "../lib/client";
import { useEffect, useState } from "react";

const ReviewComponent = ({ document }: { document: any }) => {
  const [reviewImage, setReviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewImage = async () => {
      if (document?.displayed.image) {
        const query = `*[_type == "review" && _id == $id]{
          image {
            asset->{
              url
            }
          }
        }`;
        const params = { id: document.displayed._id };
        const data = await client.fetch(query, params);
        const image = data[0]?.image?.asset?.url;
        setReviewImage(image);
      }
    };

    fetchReviewImage();
  }, [document]);

  return (
    <div className="flex flex-col items-center gap-5 p-5 border-2 border-black max-w-[400px] mx-auto mt-8">
      {/* Avatar Replacement */}
      {reviewImage ? (
        <div className="relative flex h-24 w-24 overflow-hidden rounded-full">
          <img
            src={reviewImage}
            alt={document?.displayed.name || "Reviewer"}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-2xl font-bold">
          {document?.displayed.name?.charAt(0) || "?"}
        </div>
      )}

      {/* Review Content */}
      {document?.displayed.content && (
        <div className="text-lg text-black text-center text-balance -my-[18px]">
          <SimpleText content={document?.displayed.content} />
        </div>
      )}

      {/* Reviewer Info */}
      <div className="text-center text-black mt-10">
        {document?.displayed.name && (
          <h3 className="text-2xl font-bold font-['Inknut_Antiqua'] m-0 leading-8">
            {document?.displayed.name}
          </h3>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;