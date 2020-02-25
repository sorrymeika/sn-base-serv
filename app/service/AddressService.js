const { Service } = require('sonorpc');

class AddressService extends Service {

    async addProvince(province) {
        const res = await this.app.dao.address.addProvince(province);
        return { success: true, code: 0, id: res.insertId };
    }

    async addCity(city) {
        const res = await this.app.dao.address.addCity(city);
        return { success: true, code: 0, id: res.insertId };
    }

    async addDistrict(district) {
        const res = await this.app.dao.address.addDistrict(district);
        return { success: true, code: 0, id: res.insertId };
    }

    async getProvinces() {
        const rows = await this.app.dao.address.getProvinces();
        return { success: true, code: 0, data: rows };
    }

    async getCitiesByProvinceId(provinceId) {
        const rows = await this.app.dao.address.getCitiesByProvinceId(provinceId);
        return { success: true, code: 0, data: rows };
    }

    async getCitiesByProvinceCode(provinceCode) {
        const rows = await this.app.dao.address.getCitiesByProvinceCode(provinceCode);
        return { success: true, code: 0, data: rows };
    }

    async getDistrictsByCityId(cityId) {
        const rows = await this.app.dao.address.getDistrictsByCityId(cityId);
        return { success: true, code: 0, data: rows };
    }

    async getDistrictsByCityCode(cityCode) {
        const rows = await this.app.dao.address.getDistrictsByCityCode(cityCode);
        return { success: true, code: 0, data: rows };
    }

    async getAreaInfosByDistrictCodes(districtCodes) {
        if (!Array.isArray(districtCodes) || !districtCodes.length) {
            return { success: true, code: 0, data: [] };
        }
        const rows = await this.app.dao.address.getAreaInfosByDistrictCodes(districtCodes);
        return { success: true, code: 0, data: rows };
    }

    async getAreaInfoByDistrictCode(districtCode) {
        const data = await this.app.dao.address.getAreaInfoByDistrictCode(districtCode);
        return { success: true, code: 0, data };
    }
}

module.exports = AddressService;