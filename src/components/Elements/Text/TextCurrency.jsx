import PropTypes from 'prop-types';

function TextCurrency({ text, style, fontWeight = "font-semibold", color = "text-primary" }) {

    let Idr = new Intl.NumberFormat('in-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return (
        <p className={`${color} text-2xl ${fontWeight} ${style}`}>{Idr.format(text)}</p>
    )
}

TextCurrency.propTypes = {
    text: PropTypes.number.isRequired,
    style: PropTypes.string,
    fontWeight: PropTypes.string,
    color: PropTypes.string,
};

export default TextCurrency