const AdressForm = ({ adressProps = {}, setAdressProps, disabled = false }) => {
  const phone = adressProps.phone;
  const street = adressProps.street;
  const postalCode = adressProps.postalCode;
  const city = adressProps.city;

  return (
    <>
      <input
        required
        type="tel"
        placeholder="Broj telefona"
        value={phone}
        disabled={disabled}
        onChange={(ev) => setAdressProps("phone", ev.target.value)}
      />
      <input
        required
        type="text"
        placeholder="Adresa stanovanja"
        value={street}
        disabled={disabled}
        onChange={(ev) => setAdressProps("street", ev.target.value)}
      />
      <div className="flex gap-4">
        <input
          required
          type="text"
          placeholder="Grad"
          value={city}
          disabled={disabled}
          onChange={(ev) => setAdressProps("city", ev.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Poštanski kod"
          value={postalCode}
          disabled={disabled}
          onChange={(ev) => setAdressProps("postalCode", ev.target.value)}
        />
      </div>
    </>
  );
};
export default AdressForm;
