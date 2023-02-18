import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import { sanityClient, urlFor } from "../../sanity";
import CommentBox from "../../components/Comment/CommentBox";
import { Post } from "../../typings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp,faShare,faBookmark} from "@fortawesome/free-solid-svg-icons";
import PortableText from "react-portable-text";
interface Props {
  post: Post;
}
function Post({ post }: Props) {
  console.log(post);
  const [openComment,setOpenComment] = useState(false);
  console.log(openComment)
  return (
    <main>
      <img src={urlFor(post.mainImage).url()!} alt="" className="w-full h-40 object-cover" />
      <article className="max-w-5xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>
        <div className="flex items-center space-x-2">
          <img src={urlFor(post.author.image).url()!} alt="" className="h-10 w-10 rounded-full" />
          <p className=" font-extralight text-sm">
            Blog post by <b className="text-green-600">{post.author.name}</b> - Published at{" "}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                <h1 className="text-2xl font-bold my-5" {...props} />;
              },
              h2: (props: any) => {
                <h1 className="text-xl font-bold my-5" {...props} />;
              },
              li: ({ children }: any) => {
                <li className="ml-4 list-disc">{children}</li>;
              },
              link: ({ href, children }: any) => {
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>;
              },
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      <div className="flex justify-between max-w-2xl mx-auto mb-10">
            <div>
              <FontAwesomeIcon icon={faThumbsUp} size='lg' className="mx-5 cursor-pointer" />
              <FontAwesomeIcon icon={faMessage} size="lg" className="cursor-pointer" onClick={()=>{setOpenComment(true)}} />
            </div>
            <div>
              <FontAwesomeIcon icon={faShare} size="lg" className="mx-5 cursor-pointer" />
              <FontAwesomeIcon icon={faBookmark} size="lg" className="cursor-pointer" />
            </div>
      </div>
      {
        openComment && <CommentBox closeComment= {setOpenComment} post= {post} />
      }
    </main>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
          slug{
            current
          }
      }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
      title,
      author->{
        name,
        image
      },
      'comments':*[
        _type == "comment" && 
        post._ref == ^._id && 
        approved == true],
      description,
      mainImage,
      slug,
      body
      
  }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 30, // after 60 second,
  };
};
