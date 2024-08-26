import React from "react";
import { Refine } from "@refinedev/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { dataProvider } from "./providers/data-provider";
import { EditInvoice } from "./pages/invoices/edit";
import { ListProducts } from "./pages/invoices/list";
import { CreateInvoice } from "./pages/invoices/create";

export default function App(): JSX.Element {
  return (
    <Router>
      <Refine dataProvider={dataProvider}>
        <Routes>
          <Route path="/" element={<ListProducts />} />
          <Route path="/create" element={<CreateInvoice />} />
          <Route path="/edit/:id" element={<EditInvoice />} />
        </Routes>
      </Refine>
    </Router>
  );
}
