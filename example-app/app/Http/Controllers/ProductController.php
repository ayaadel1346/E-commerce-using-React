<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index (){

        return Product::all();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'price' => 'required|numeric'
        ]);
    
        $product = Product::create($validated);
    
        return response()->json($product, 201);
    }


    public function show($id) {
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    
        return response()->json($product, 200); 
    }


   
    public function update(Request $request, $id) {
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    
        $validated = $request->validate([
            'title' => 'sometimes|required|max:255',
            'description' => 'sometimes|required',
            'price' => 'sometimes|required|numeric'
        ]);
    
        $product->update($validated);
    
        return response()->json($product, 200);
    }
    
    
    

    public function destroy(Product $product) {
        $product->delete();
    
        return response()->json('Deleted', 200);
    }
    
    
}
