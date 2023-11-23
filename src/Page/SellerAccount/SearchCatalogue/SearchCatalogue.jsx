import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const SearchCatalogue = () => {
    return (
<section className='absolute top-0 left-0 p-10 w-full'>
<div className='w-full bg-white px-3 py-5'>
<p className='font-semibold'>Search Takealot's Catalogue</p>

<div className='w-full flex items-center mt-3 justify-between gap-3'>

<div className='w-full flex items-center'>

<div className='w-full'>
  <select id="selectOption" name="selectOption" className='px-4 py-1 text-sm border rounded w-full'>
  <option value="Search by Product Title">Search by Product Title</option>
  <option value="Product Title">Product Title</option>
  <option value="GTIN[Barcode]">GTIN[Barcode]</option>
  <option value="Takealot.com URL">Takealot.com URL</option>
  <option value="PLD">PLD</option>
  <option value="TSIN">TSIN</option>
  </select>
</div>
<div className='w-full relative'>
  <input type="text" placeholder='Search by product keywords, brands etc' className='w-full border px-2 py-[6px] text-[10px] placeholder:font-medium placeholder:text-gray-400 outline-none' />
  <IoSearchOutline className='absolute right-4 top-2' />
</div>

</div>

<div className='w-3/4'>
<select id="selectOption" name="selectOption" className='px-4 py-1 text-sm border rounded w-full'>
  <option value="Search by Product Title">All Departments</option>
  <option value="Product Title">Product Title</option>
  <option value="GTIN[Barcode]">GTIN[Barcode]</option>
  <option value="Takealot.com URL">Takealot.com URL</option>
  <option value="PLD">PLD</option>
  <option value="TSIN">TSIN</option>
  </select>
</div>


</div>
</div>
</section>
    );
};

export default SearchCatalogue;