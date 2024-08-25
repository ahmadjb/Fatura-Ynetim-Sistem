import React from "react";
import { Refine } from "@refinedev/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateInvoice } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Router>
      <Refine dataProvider={dataProvider}>
        <Routes>
          <Route path="/" element={<ListProducts />} />
          <Route path="/create" element={<CreateInvoice />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/show/:id" element={<ShowProduct />} />
        </Routes>
        
      </Refine>
    </Router>
  );
}
