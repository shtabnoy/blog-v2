/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../queries";

interface ArticleProps {}

const Article: React.FC<ArticleProps> = () => {
  const params = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: {
      id: params.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <div>{data.article.title}</div>
      <div>{data.article.body}</div>
    </React.Fragment>
  );
};

export default Article;
