import React, { useState } from "react";
import styles from "./divForm.module.css";

const DivForm: React.FC = () => {
  const [name, setName] = useState("");
  const [animals, setAnimals] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const handleCheck: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setAnimals([...animals, e.target.value]);
      return;
    }
    setAnimals(animals.filter((animal) => animal !== e.target.value));
  };
  const isDisabled = !name || animals.length === 0;
  // 入力されている名前とチェックされている動物をコンソールに出す
  const handleSubmit = () => {
    if (isDisabled) return;
    setIsDone(true);
  };

  const checkList = [
    { name: "cat", label: "Cat" },
    { name: "dog", label: "Dog" },
    { name: "tiger", label: "Tiger" },
  ];
  return (
    <div>
      <div className={styles.mainHeading}>Test Form</div>
      <div className={styles.subHeading}>name</div>
      <input
        className={styles.input}
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />

      <div className={styles.subHeading}>
        <strong>choose animals</strong>
      </div>

      {/* 動物のチェックボックスリスト */}
      <div className={styles.form}>
        {checkList.map((item) => (
          <div key={item.name} className={styles.item}>
            <div>{item.label}</div>
            <input type="checkbox" name={item.name} onChange={handleCheck} />
          </div>
        ))}
      </div>

      <div
        className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
        onClick={handleSubmit}
      >
        submit
      </div>
      {isDone && <div className={styles.success}>SUCCESS!!</div>}
    </div>
  );
};

export default DivForm;
