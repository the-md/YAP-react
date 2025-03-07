import React, { useRef, useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../../services/user/slice.ts";
import { onChangeUser } from "../../../services/user/actions.ts";
import { AppDispatch, useDispatch, useSelector } from "../../../services/store.ts";
import { User } from "../../../utils/types.ts";

export const ProfileUser: React.FC = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch<AppDispatch>();
  const [changeForm, setChangeForm] = useState<boolean>(false)
  const [formData, setFormData] = useState<User>({
    name: user?.name || '',
    email: user?.email || '',
    password: '******',
  })
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement | null>(null);

  const onIconClickName = () => {
    setIsNameEdit(true)
    setTimeout(() => nameRef.current!.focus(), 0);
  }
  const onBlurName = () => {
    setIsNameEdit(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeForm(true)
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      return;
    }
    const updatedData: Partial<User> = {};
    if (formData.name !== user.name) updatedData.name = formData.name;
    if (formData.email !== user.email) updatedData.email = formData.email;
    if (formData.password !== '******') updatedData.password = formData.password;
    if (Object.keys(updatedData).length > 0) {
      dispatch(onChangeUser(updatedData));
    }
    setChangeForm(false)
  }
  const handleResetForm = () => {
    setChangeForm(false)
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '******',
    })
  }

  return (
    <div className="text_align-center">
      <div className="display-flex flex_direction-column align_items-center">
        <form action="" onSubmit={handleSubmitForm}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => handleChange(e)}
            icon={'EditIcon'}
            value={formData.name ?? ''}
            name={'name'}
            ref={nameRef}
            size={'default'}
            extraClass="mb-6"
            disabled={!isNameEdit}
            onIconClick={onIconClickName}
            onBlur={onBlurName}
          />
          <EmailInput
            onChange={e => handleChange(e)}
            value={formData.email ?? ''}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={e => handleChange(e)}
            value={formData.password ?? ''}
            name={'password'}
            extraClass="mb-6"
            icon="EditIcon"
          />
          {changeForm && (
            <div className="display-flex justify_content-end">
              <Button htmlType="reset" type="secondary" size="medium" extraClass="mb-20" onClick={handleResetForm}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}