import PropTypes from 'prop-types';

function TextCurrency({ text, style, fontWeight, color }) {

    let Idr = new Intl.NumberFormat('in-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return (
        <p className={`${color} text-2xl ${fontWeight} ${style}`}>{Idr.format(text)}</p>
    )
}

TextCurrency.defaultProps = {
    color: "text-primary",
    fontWeight: "font-semibold",
}

TextCurrency.propTypes = {
    text: PropTypes.number.isRequired,
    style: PropTypes.string,
    fontWeight: PropTypes.string,
    color: PropTypes.string,
};

export default TextCurrency