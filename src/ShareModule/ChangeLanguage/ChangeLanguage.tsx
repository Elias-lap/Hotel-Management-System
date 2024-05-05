import { useTranslation } from "react-i18next";

export default function ChangeLanguage() {
  const locales: any = {
    en: { title: "English" },
    ar: { title: "العربيه" },
  };

  //   console.log(locales.en.title)
  const { t, i18n } = useTranslation();

//   console.log(i18n.resolvedLanguage);

  return (
    <>
      <div
        style={{
          // padding: "0px 50px",
          margin: "0",
          position: "relative",
          // right: "50px",
          direction: "rtl",
          backgroundColor: "inherit",
       
        }}
      >
        <ul>
          {Object.keys(locales).map((locale) => (
            <li style={{ listStyle: "none" }} key={locale}>
              <button
                style={{
                  fontWeight:
                    i18n.resolvedLanguage === locale ? "bold" : "normal",
                  backgroundColor: "inherit",
                  border: "none",
               
                }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(locale);
                }}
              >
                {locales[locale].title}
              </button>
            </li>
          ))}
        </ul>
        {/* <h1>{t('main.header')}</h1> */}
      </div>
    </>
  );
}
