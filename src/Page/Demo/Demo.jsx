import { all } from 'axios';
import React, { useEffect, useState } from 'react';

const Demo = () => {

    const [allData, setAllData] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);

    useEffect(() => {
        fetch("./newData.json")
            .then(res => res.json())
            .then(data => setAllData(data))
    }, [])

    console.log(allData);


    useEffect(() => {
        const categoryMap = {};

        allData.forEach(item => {
            const mainCategory = item.Categories[0];
            const subCategories = item.Categories.slice(1).filter(subCategory => subCategory !== "");

            if (!categoryMap[mainCategory]) {
                categoryMap[mainCategory] = {
                    mainCategory,
                    subCategories: new Set(),
                };
            }

            subCategories.forEach(subCategory => categoryMap[mainCategory].subCategories.add(subCategory));
        });

        const uniqueCategoriesArray = Object.values(categoryMap).map(category => ({
            mainCategory: category.mainCategory,
            subCategories: Array.from(category.subCategories),
        }));

        setUniqueCategories(uniqueCategoriesArray);
    }, [allData]);

    console.log(uniqueCategories);



    return (
        <div>
            Demo
        </div>
    );
};

export default Demo;
