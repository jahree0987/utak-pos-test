import * as React from "react";
import styled from "styled-components";
import CategoryDropdown from "./CategoryDropdown";
import ImageUpload from "./ImageUpload";
import AddButton from "@/app/category/components/AddButton";
import { useForm } from "react-hook-form";
import { useFoodContext } from "./context/FoodContext";
import { addFood } from "@/app/firebase/food/addfood";
import { updateFood } from "@/app/firebase/food/updateFood";

const Div = styled.div`
  border-radius: 36px;
  background-color: #fdfdfb;
  display: flex;
  max-width: 900px;
  flex-direction: column;
  padding: 25px 62px 39px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
  margin: auto;
`;

const Div2 = styled.div`
  color: #63bac1;
  align-self: center;
  font: 400 24px/133.4% Roboto, sans-serif;
`;

const Div3 = styled.div`
  margin-top: 33px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: 4px;
  }
`;

const Div4 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 50%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div5 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div6 = styled.div`
  color: #000;
  font: 400 14px/137% Roboto, sans-serif;
`;

const Div8 = styled.div`
  color: #000;
  margin-top: 31px;
  font: 400 14px/137% Roboto, sans-serif;
`;

const Div10 = styled.div`
  color: #000;
  margin-top: 18px;
  font: 400 14px/137% Roboto, sans-serif;
`;

const Div12 = styled.div`
  color: #000;
  margin-top: 19px;
  font: 400 14px/137% Roboto, sans-serif;
`;

const Div13 = styled.div`
  border-radius: 15px;
  border: 1px solid #a2d7ae;
  background-color: #fff;
  display: flex;
  margin-top: 19px;
  justify-content: center;
  align-items: center;
  padding: 11px 60px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Img = styled.img`
  aspect-ratio: 1.1;
  object-fit: auto;
  object-position: center;
  width: 32px;
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 50%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div14 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  font-size: 14px;
  color: #000;
  font-weight: 400;
  line-height: 137%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div15 = styled.div`
  font-family: Roboto, sans-serif;
  align-self: start;
  margin-left: 13px;
  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const Div18 = styled.div`
  font-family: Roboto, sans-serif;
  align-self: start;
  margin: 26px 0 0 14px;
  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const Div20 = styled.div`
  font-family: Roboto, sans-serif;
  align-self: start;
  margin: 27px 0 0 13px;
  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const Div22 = styled.div`
  font-family: Roboto, sans-serif;
  align-self: start;
  white-space: nowrap;
  margin: 20px 0 0 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div23 = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: space-between;
  gap: 19px;
  font-size: 16px;
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  white-space: nowrap;
  letter-spacing: 0.15px;
  line-height: 150%;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div24 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 9px;
  padding: 9px 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div25 = styled.div`
  font-family: Roboto, sans-serif;
`;

const Div26 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 9px;
  padding: 9px 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div27 = styled.div`
  font-family: Roboto, sans-serif;
`;

const Div28 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 9px;
  padding: 9px 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div29 = styled.div`
  font-family: Roboto, sans-serif;
`;

const Div7 = styled.div`
  input {
    width: 100%;
    border-radius: 15px;
    border: 1px solid #a2d7ae;
    background-color: #fff;
    margin-top: 16px;
    justify-content: center;
    align-items: start;
    color: #909090;
    white-space: nowrap;
    padding: 20px 60px 20px 20px;
    font: 400 14px/137% Roboto, sans-serif;
    @media (max-width: 991px) {
      white-space: initial;
      padding-right: 20px;
    }
  }
  input:focus {
    outline: none; /* Removes the default focus outline */
    border-color: #015042; /* Hides the border when focused */
  }
  p {
    color: red;
  }
`;

export default function AddFoodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const {
    selectedCategory,
    selectedFile,
    setSelectedFile,
    setSelectedCategory,
    fetchFood,
    isEditing,
    editFood,
    editFoodCategory,
    setEditFood,
    setEditFoodCategory,
    setIsEditing,
    addItemFromArray,
    allFood,
  } = useFoodContext();

  const clear = () => {
    reset();
    setSelectedFile(undefined);
    setSelectedCategory(undefined);
    setEditFood(undefined);
    setEditFoodCategory(undefined);
    setIsEditing(false);
  };

  const onSubmit = async (data: any) => {
    if (isEditing) {
      const newData = {
        ...data,
        category: selectedCategory
          ? selectedCategory.keys
          : editFoodCategory?.keys,
        keys: editFood?.keys,
      };
      if (selectedFile) {
        await updateFood(newData, selectedFile);
        fetchFood();
      } else {
        await updateFood(newData);
        fetchFood();
      }
    } else {
      if (!selectedFile || !selectedCategory) {
        alert("Need to choose an image or select food category");
        return;
      } else {
        const newData = { ...data, category: selectedCategory?.keys };
        const newFoodData = (await addFood(newData, selectedFile)) as any;
        if (allFood) {
          const newFoodItems = addItemFromArray(allFood, newFoodData);
         
        }
      }
    }
    clear();
  };

  React.useEffect(() => {
    if (isEditing) {
      setValue("name", editFood?.name);
      setValue("description", editFood?.description);
      setValue("price", editFood?.price);
      setValue("cost", editFood?.cost);
      setValue("stock", editFood?.stock);
      setValue("sizes", editFood?.sizes);
    }
  }, [isEditing, editFood]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Div>
        <Div2>{isEditing ? "EDIT" : "ADD"} FOOD</Div2>
        <Div3>
          <Div4>
            <Column>
              <Div5>
                <Div6>Food Name</Div6>
                <Div7>
                  <input
                    type="text"
                    placeholder="Enter Food name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <p>This field is required</p>}
                </Div7>
                <Div8>Description</Div8>
                <Div7>
                  <input
                    type="text"
                    placeholder="Enter Food Description"
                    {...register("description", { required: true })}
                  />
                  {errors.description && <p>This field is required</p>}
                </Div7>
                <Div10>Price</Div10>
                <Div7>
                  <input
                    type="text"
                    placeholder="Enter Food Price"
                    {...register("price", { required: true })}
                  />
                  {errors.price && <p>This field is required</p>}
                </Div7>
                <Div12>Upload Image</Div12>
                <Div13>                
                  <ImageUpload />
                </Div13>
              </Div5>
            </Column>
            <Column2>
              <Div14>
                <Div15>Category</Div15>
                <CategoryDropdown />
                <Div18>Cost</Div18>
                <Div7>
                  <input
                    type="text"
                    placeholder="Enter Food Cost"
                    {...register("cost", { required: true })}
                  />
                  {errors.cost && <p>This field is required</p>}
                </Div7>
                <Div20>Stock</Div20>
                <Div7>
                  <input
                    type="text"
                    placeholder="Enter Food Stock"
                    {...register("stock", { required: true })}
                  />
                  {errors.stock && <p>This field is required</p>}
                </Div7>
                <Div22>Available Sizes (optional)</Div22>
                <Div23>
                  <Div24>
                    <input
                      type="checkbox"
                      value="small"
                      {...register("sizes")}
                    />
                    <Div25>Small</Div25>
                  </Div24>
                  <Div26>
                    <input
                      type="checkbox"
                      value="Medium"
                      {...register("sizes")}
                    />
                    <Div27>Medium</Div27>
                  </Div26>
                  <Div28>
                    <input
                      type="checkbox"
                      value="Large"
                      {...register("sizes")}
                    />
                    <Div29>Large</Div29>
                  </Div28>
                </Div23>
              </Div14>
            </Column2>
          </Div4>
        </Div3>
        <AddButton>{isEditing ? "EDIT" : "ADD"}</AddButton>
      </Div>
    </form>
  );
}
